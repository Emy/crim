import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import CrimClient from '../../lib/CrimClient';
import { getLogger } from '@log4js2/core';
import CrimPlayer from '../../lib/structs/CrimPlayer';

const logger = getLogger('Crim');

class StopCommand extends Command {
  client: CrimClient;
  constructor() {
    super('stop', {
      aliases: ['stop'],
      channel: 'guild',
      description: 'Stop the music.',
    });
  }

  async exec(message: Message, args: any) {
    logger.debug('STOP COMMAND');
    const player = this.client.music.players.get(message.guild.id) as CrimPlayer;
    if (!player) return message.channel.send('No music running.');
    player.queue = [];
    player.stop();
    message.reply('Stopping the music...');
  }
}

export default StopCommand;
