import config from './config'
import CrimClient from './lib/CrimClient'
import { Shoukaku, Connectors } from 'shoukaku';
import { getLogger } from '@log4js2/core'
import { CommandHandler } from './framework/command/commandHandler';

const logger = getLogger('Crim');

async function start() {
    //TODO intents
    const client = new CrimClient({intents: ['DIRECT_MESSAGES', 'GUILDS', 'GUILD_MESSAGES']});
    const shoukaku = new Shoukaku(new Connectors.DiscordJS(client), config.voiceNodes);
    client.shoukaku = shoukaku;
    shoukaku.on('error', (_, error) => logger.error(error));
    new CommandHandler(client);
    client.login(config.discordToken);

}

start();