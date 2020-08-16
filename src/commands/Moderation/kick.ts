import { Message } from 'discord.js';
import CrimCommand from '../../lib/CrimCommand';

class KickCommand extends CrimCommand {
  constructor() {
    super('kick', {
      aliases: ['kick'],
      channel: 'guild',
      category: 'Moderation',
      args: [{}],
    });
    this.helpText = 'Kick a user.';
  }

  exec(message: Message) {
    return message.reply('Pong!');
  }
}

module.exports = KickCommand;
