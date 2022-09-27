import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from 'discord-akairo';
import { join } from 'path';
import { ClientOptions } from 'discord.js';
import mongoose from 'mongoose';
import GuildSettingsManager from './managers/GuildSettingsManager';
import { LoggerUtil } from '../logger.util';
import { Manager } from 'erela.js';
import { Logger } from 'tslog';
import config from '../config';

const logger: Logger = LoggerUtil.getInstance().createChildLogger();

export default class CrimClient extends AkairoClient {
  settings: GuildSettingsManager;
  commandHandler: CommandHandler;
  inhibitorHandler: InhibitorHandler;
  listenerHandler: ListenerHandler;
  manager: Manager;

  constructor(options: ClientOptions) {
    super(
      {
        ownerID: config.owners,
        ...options,
      },
      {
        allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
        partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
        ...options,
      },
    );

    this.settings = new GuildSettingsManager();

    this.commandHandler = new CommandHandler(this, {
      commandUtilSweepInterval: 0,
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
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('DB connected.');
    return super.login(token);
  }
}
