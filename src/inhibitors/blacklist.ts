import { Inhibitor } from 'discord-akairo';
import { Message } from 'discord.js';

class BlacklistInhibitor extends Inhibitor {
  constructor() {
    super('blacklist', {
      reason: 'blacklist',
    });
  }

  exec(message: Message) {
    const blacklist = [];
    return blacklist.includes(message.author.id);
  }
}

module.exports = BlacklistInhibitor;
