import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from "discord-akairo";
import { join } from "path";
import { ClientOptions } from "discord.js";
import { load } from "ts-dotenv";

const env = load({
  NODE_ENV: String,
  OWNERID: String,
  DISCORD_ACCESS_TOKEN: String,
  SENTRY_DSN: String,
});

export default class CrimClient extends AkairoClient {
  commandHandler: CommandHandler;
  inhibitorHandler: InhibitorHandler;
  listenerHandler: ListenerHandler;
  env: any;
  constructor(options: ClientOptions) {
    super({
      ownerID: env.OWNERID.split(','),
    },
    {
      disableMentions: 'everyone',
      ...options
    });

    this.env = env;

    this.commandHandler = new CommandHandler(this, {
      directory: join(__dirname, '..', 'commands'),
      prefix: '!',
    });

    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: join(__dirname, '..', 'inhibitors'),
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: join(__dirname, '..', 'listeners'),
    });

    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.commandHandler.useListenerHandler(this.listenerHandler);

    this.commandHandler.loadAll();
    this.inhibitorHandler.loadAll();
    this.listenerHandler.loadAll();
  }
}