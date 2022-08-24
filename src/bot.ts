import config from './config';
import CrimClient from './lib/CrimClient';
import { CommandHandler } from './framework/command/commandHandler';
import { Manager } from 'erela.js';
import { getLogger } from '@log4js2/core';

const logger = getLogger('Crim');

async function start() {
  const client = new CrimClient({ intents: ['DIRECT_MESSAGES', 'GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'] });
  const manager: Manager = new Manager({
    nodes: config.voiceNodes,
    send(id, payload) {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    },
  })
    .on('nodeConnect', (node) => logger.info(`Node ${node.options.identifier} connected`))
    .on('nodeError', (node, error) => logger.error(`Node ${node.options.identifier} had an error: ${error.message}`));
  client.manager = manager;
  new CommandHandler(client);
  client.login(config.discordToken);
}

start();
