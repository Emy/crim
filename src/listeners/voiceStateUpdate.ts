import { Listener } from 'discord-akairo';
import { GuildMember } from 'discord.js';

class VoiceStateUpdateListener extends Listener {
  constructor() {
    super('voiceStateUpdate', {
      emitter: 'client',
      event: 'voiceStateUpdate',
    });
  }

  exec(oldMember: GuildMember, newMember: GuildMember) {
    console.log('I detected a voice state change!~');
  }
}

module.exports = VoiceStateUpdateListener;
