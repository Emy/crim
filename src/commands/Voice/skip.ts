import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import CrimClient from '../../lib/CrimClient';
import { getLogger } from '@log4js2/core';

const logger = getLogger('Crim');

class SkipCommand extends Command {
  declare client: CrimClient;
  constructor() {
    super('skip', {
      aliases: ['skip'],
      channel: 'guild',
      description: 'Skip a track.',
    });
  }

  async exec(message: Message) {
    logger.debug('SKIP COMMAND');
    const player = this.client.music.players.get(message.guild.id);
    if (!player) return message.channel.send('No music running.');
    this.client.music.players.get(message.guild.id).stop();
    message.reply('Skipping the track...');
  }
}

export default SkipCommand;
