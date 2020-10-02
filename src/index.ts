import { load } from 'ts-dotenv';
import CrimClient from './lib/CrimClient';
import { ShardingManager } from 'kurasuta';
import { join } from 'path';
import { getLogger } from '@log4js2/core';

const logger = getLogger('Crim');

const env = load({
  NODE_ENV: String,
  OWNERID: String,
  DISCORD_ACCESS_TOKEN: String,
  SENTRY_DSN: String,
});

const manager = new ShardingManager(join(__dirname, 'lib', 'BaseCluster'), {
  token: env.DISCORD_ACCESS_TOKEN,
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
  .catch((error) => {
    logger.error('Spawning error: {}', error, error);
  });
