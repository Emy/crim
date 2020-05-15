require('dotenv').config();
import Sentry from '@sentry/node';
import { config } from './config';
import FiloClient from './lib/client';

if (process.env.NODE_ENV == 'production') Sentry.init({ dsn: process.env.SENTRY_DSN });

new FiloClient(config).login(process.env.DISCORD_ACCESS_TOKEN);
