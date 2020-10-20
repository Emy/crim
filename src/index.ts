import CrimClient from './lib/CrimClient';
import { ShardingManager } from 'kurasuta';
import { join } from 'path';
import { getLogger } from '@log4js2/core';
import config from './config';

const logger = getLogger('Crim');

const manager = new ShardingManager(join(__dirname, 'lib', 'BaseCluster'), {
  token: config.discordToken,
  client: CrimClient,
  shardCount: 'auto',
  ipcSocket: 9454,
  timeout: 60000,
});

manager
  .spawn()
  .then(() => {
    logger.info('Spawning shard. Shard count: {}', manager.shardCount);
  })
  .catch((reason) => {
    logger.error('Spawning error: REASON = {}', reason);
  });
