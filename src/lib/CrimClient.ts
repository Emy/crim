import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from 'discord-akairo';
import { join } from 'path';
import { ClientOptions } from 'discord.js';
import { load } from 'ts-dotenv';
import mongoose from 'mongoose';
import { configure, getLogger, LogLevel } from '@log4js2/core';
import GuildSettingsManager from './managers/GuildSettingsManager';

configure({
  layout: '%d [%p] %c %M- %m %ex',
  appenders: ['Console'],
  loggers: [
    {
      tag: 'Crim',
      level: LogLevel.ALL,
    },
  ],
});

const logger = getLogger('Crim');

const env = load({
  NODE_ENV: String,
  OWNERID: String,
  DISCORD_ACCESS_TOKEN: String,
  SENTRY_DSN: String,
  MONGODB_CONNECTION_STRING: String,
});

export default class CrimClient extends AkairoClient {
  settings: GuildSettingsManager;
  commandHandler: CommandHandler;
  inhibitorHandler: InhibitorHandler;
  listenerHandler: ListenerHandler;
  constructor(options: ClientOptions) {
    super(
      {
        ownerID: env.OWNERID.split(','),
      },
      {
        disableMentions: 'everyone',
        partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
        ...options,
      },
    );

    this.settings = new GuildSettingsManager();

    this.commandHandler = new CommandHandler(this, {
      directory: join(__dirname, '..', 'commands'),
      prefix: async (message) => {
        if (message.guild && message.guild.available) {
          logger.debug('PREFIX FETCH');
          const prefix = (await this.settings.get(message.guild.id)).prefix;
          logger.debug('PREFIX FETCHED!');
          return prefix;
        }
        return '!';
      },
    });

    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: join(__dirname, '..', 'inhibitors'),
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: join(__dirname, '..', 'listeners'),
    });

    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.commandHandler.useListenerHandler(this.listenerHandler);

    this.commandHandler.automateCategories = true;

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
    });
    logger.info('Emitters set.');

    this.commandHandler.loadAll();
    this.inhibitorHandler.loadAll();
    this.listenerHandler.loadAll();
    logger.info('Handlers loaded.');
  }

  async login(token: string): Promise<string> {
    await mongoose.connect(env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info('DB connected.');
    return super.login(token);
  }
}
