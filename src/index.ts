import { join } from 'path';
import {Logger} from 'tslog';
import config from './config';
import { ShardingManager } from 'discord.js';
import { LoggerUtil } from './logger.util';

const logger: Logger = LoggerUtil.getInstance().createChildLogger();

export class ShardBot {
  static start(): void {
    const manager = new ShardingManager(join(__dirname, 'bot.js'), {
      token: config.discordToken,
    });

    manager
      .spawn()
      .then(() => {
        logger.info('Spawning shard');
      })
      .catch((reason) => {
        logger.error('Spawning error: REASON = {}', reason);
      });
  }
}

ShardBot.start();
