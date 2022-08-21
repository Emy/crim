import config from './config'
import CrimClient from './lib/CrimClient'

async function start() {
    //TODO intents
    const client = new CrimClient({intents: []});
    client.login(config.discordToken);
}

start();