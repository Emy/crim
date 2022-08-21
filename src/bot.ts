import config from './config'
import CrimClient from './lib/CrimClient'
import { Shoukaku, Connectors } from 'shoukaku';

async function start() {
    //TODO intents
    const client = new CrimClient({intents: ['DIRECT_MESSAGES', 'GUILDS', 'GUILD_MESSAGES']});
    const shoukaku = new Shoukaku(new Connectors.DiscordJS(client), config.voiceNodes);
    client.shoukaku = shoukaku;
    shoukaku.on('error', (_, error) => console.log(error));
    client.login(config.discordToken);
}

start();