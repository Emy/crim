import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping'],
      description: 'Ping command.',
    });
  }

  async exec(message: Message) {
    return message.channel.send('Pong.');
  }
}

export default PingCommand;
