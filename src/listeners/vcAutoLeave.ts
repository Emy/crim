// import { getLogger } from '@log4js2/core';
import { Listener } from 'discord-akairo';
import { VoiceState } from 'discord.js';
import CrimClient from '../lib/CrimClient';

// const logger = getLogger('Crim');

class VoiceStateUpdateListener extends Listener {
  declare client: CrimClient;
  constructor() {
    super('vcAutoLeave', {
      emitter: 'client',
      event: 'voiceStateUpdate',
    });
  }

  async exec(oldMember: VoiceState) {
    if (!oldMember.channel) return
    const player = this.client.manager.players.get(oldMember.guild.id)
    if (oldMember.channel.members.size === 1){
      player.destroy();
    }
  }
}

export default VoiceStateUpdateListener;
