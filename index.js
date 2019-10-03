if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
} else {
  const Sentry = require('@sentry/node');
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}

const { Client } = require('klasa');
const { config } = require('./config');

class Filo extends Client {
  constructor(...args) {
    super(...args);
  }
}

Client.use(require('klasa-dashboard-hooks'));
new Filo(config).login(process.env.DISCORD_ACCESS_TOKEN);
