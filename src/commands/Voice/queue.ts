import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import CrimClient from '../../lib/CrimClient';
import { getLogger } from '@log4js2/core';
import CrimPlayer from '../../lib/structs/CrimPlayer';
import { MessageEmbed } from 'discord.js';
import humanizeDuration from 'humanize-duration';

const logger = getLogger('Crim');

class QueueCommand extends Command {
  client: CrimClient;
  constructor() {
    super('queue', {
      aliases: ['queue'],
      channel: 'guild',
      description: 'Show the music queue.',
    });
  }

  async exec(message: Message) {
    logger.debug('Queue COMMAND');
    const player = this.client.music.players.get(message.guild.id) as CrimPlayer;
    if (!player) return message.channel.send('No music running...');
    let queue = '';
    player.queue.forEach((track, index) => {
      if (index >= 10) return;
      queue += `${index + 1}: **${track.title}** (${humanizeDuration(Math.floor(track.length), {
        maxDecimalPoints: 0,
      })})\n`;
    });
    if (!player) return message.channel.send('No music running.');
    const embed = new MessageEmbed()
      .setTitle('Queue')
      .setColor('#ffd1dc')
      .setDescription(queue == '' ? 'No tracks in queue' : 'Showing the 10 most recent tracks... \n\n' + queue);
    message.channel.send(embed);
  }
}

export default QueueCommand;
