import { join } from 'path';
import { getLogger } from '@log4js2/core';
import config from './config'
import { ShardingManager } from 'discord.js';

const logger = getLogger('Crim');

export class ShardBot {
  static start(): void {

    const manager = new ShardingManager(join(__dirname, 'bot.js'), {
      token: config.discordToken,
    });
      
    manager.spawn()
    .then(() => {
      logger.info('Spawning shard');
    })
    .catch((reason) => {
      logger.error('Spawning error: REASON = {}', reason);
    });;
  }
}

ShardBot.start();