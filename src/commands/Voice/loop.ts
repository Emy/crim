import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import CrimClient from '../../lib/CrimClient';
import { getLogger } from '@log4js2/core';
import { MessageEmbed } from 'discord.js';
import CrimPlayer from '../../lib/structs/CrimPlayer';

const logger = getLogger('Crim');

class LoopCommand extends Command {
  client: CrimClient;
  constructor() {
    super('loop', {
      aliases: ['loop', 'l'],
      channel: 'guild',
      description: 'Loop the currently playing track.',
    });
  }

  async exec(message: Message) {
    logger.debug('LOOP COMMAND');
    const player = this.client.music.players.get(message.guild.id) as CrimPlayer;
    if (!player) return message.channel.send('No music running.');
    player.loop = !player.loop;
    const embed = new MessageEmbed()
      .setTitle('🎵 Loop')
      .setColor('#ffd1dc')
      .setDescription(
        player.loop ? 'I am looping the current track.' : 'I will stop looping the currently playing track.',
      );
    message.channel.send(embed);
  }
}

export default LoopCommand;
