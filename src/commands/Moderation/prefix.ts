import { Command } from 'discord-akairo';
import CrimClient from '../../lib/CrimClient';
import { Message } from 'discord.js';

class PrefixCommand extends Command {
  client: CrimClient;
  constructor() {
    super('prefix', {
      aliases: ['prefix'],
      description: 'Change the prefix (default: !)',
      args: [
        {
          id: 'prefix',
          default: '!',
        },
      ],
      channel: 'guild',
    });
  }

  async exec(message: Message, args: any) {
    const guildSettings = await this.client.settings.get(message.guild.id);
    guildSettings.prefix = args.prefix;
    await guildSettings.save();
    return message.reply(`Prefix changed to ${args.prefix}`);
  }
}

export default PrefixCommand;
