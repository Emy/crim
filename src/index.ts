import { load } from 'ts-dotenv';
import { init } from '@sentry/node';
import CrimClient from './lib/CrimClient';
import { ShardingManager } from 'kurasuta';
import { join } from 'path';

const env = load({
  NODE_ENV: String,
  OWNERID: String,
  DISCORD_ACCESS_TOKEN: String,
  SENTRY_DSN: String,
});

if (env.NODE_ENV == 'production') init({ dsn: env.SENTRY_DSN });

const manager = new ShardingManager(join(__dirname, "lib", "BaseCluster"), {
  token: env.DISCORD_ACCESS_TOKEN,
  client: CrimClient,
  shardCount: "auto",
  ipcSocket: 9454,
  timeout: 60000,
});

manager.spawn().catch(error => {
	console.error(error);
	throw error;
});

