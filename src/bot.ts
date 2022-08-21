import config from './config'
import CrimClient from './lib/CrimClient'
const { Shoukaku, Connectors } = require('shoukaku');

async function start() {
    //TODO intents
    const client = new CrimClient({intents: []});
    const shoukaku = new Shoukaku(new Connectors.DiscordJS(client), config.voiceNodes);
    client.shoukaku = shoukaku;
    shoukaku.on('error', (_, error) => console.log(error));
    client.login(config.discordToken);
}

start();