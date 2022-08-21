import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import CrimClient from '../../lib/CrimClient';
import { getLogger } from '@log4js2/core';
import { MessageEmbed } from 'discord.js';
import CrimPlayer from '../../lib/structs/CrimPlayer';

const logger = getLogger('Crim');

class PauseCommand extends Command {
  declare client: CrimClient;
  constructor() {
    super('pause', {
      aliases: ['pause', 'p'],
      channel: 'guild',
      description: 'Pause the music playing in vc.',
    });
  }

  async exec(message: Message) {
    logger.debug('Pause COMMAND');
    const player = this.client.music.players.get(message.guild.id) as CrimPlayer;
    if (!player) return message.channel.send('No music running.');
    player.pause(!player.paused);
    const embed = new MessageEmbed()
      .setTitle('🎵 Pause')
      .setColor('#ffd1dc')
      .setDescription(player.paused ? 'Paused the music' : 'Resuming the music.');
    message.channel.send({embeds: [embed]});;
  }
}

export default PauseCommand;
