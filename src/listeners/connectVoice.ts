import { Listener } from 'discord-akairo';
// import cron from 'node-cron';
// import { LavalinkNodeOptions, Manager } from '@lavacord/discord.js';
import CrimClient from '../lib/CrimClient';
// import { getLogger } from '@log4js2/core';
// import config from '../config';

// const logger = getLogger('Crim');

class ReadyListener extends Listener {
  declare client: CrimClient;
  constructor() {
    super('connectVoice', {
      emitter: 'client',
      event: 'ready',
    });
  }

  async exec() {
    // logger.debug('CONNECTVOICE LISTENER INVOKED');
    // this.client.music = new Manager(this.client, nodes, { user: this.client.user.id, player: CrimPlayer });
    // this.client.music.on('reconnecting', (node) => {
    //   logger.debug('RECONNECT NODE: {}', node.host);
    // });
    // try {
    //   await this.client.music.connect();
    //   logger.info('Connected to Voice Nodes.');
    // } catch (error) {
    //   logger.error('Connection to Lavalink Node(s) failed. Error: {}', error);
    // }
    // cron.schedule('* * * * *', async () => {
    //   this.client.music.nodes.forEach(async (node) => {
    //     if (node.connected) return;
    //     try {
    //       logger.debug('TRYING TO RECONNECT NODE: {}', node.id);
    //       await node.connect();
    //       logger.debug('Connection to node: {} was successful', node.id);
    //     } catch (error) {}
    //   });
    // });
  }
}

export default ReadyListener;
