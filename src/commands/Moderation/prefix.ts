import { Command } from 'discord-akairo';
import CrimClient from '../../lib/CrimClient';
import { Message } from 'discord.js';

class PrefixCommand extends Command {
  declare client: CrimClient;
  constructor() {
    super('prefix', {
      aliases: ['prefix'],
      description: [
        'Change the prefix (default: !)',
        'Usage: `prefix <prefix>`',
        'prefix: The prefix that is needed to let the bot listen to comands. (Default prefix is !)',
      ],
      args: [
        {
          id: 'prefix',
          default: '!',
        },
      ],
      channel: 'guild',
    });
  }

  async exec(message: Message, args: PrefixCommandArguments) {
    const guildSettings = await this.client.settings.get(message.guild.id);
    guildSettings.prefix = args.prefix;
    await guildSettings.save();
    return message.reply(`Prefix changed to ${args.prefix}`);
  }
}

type PrefixCommandArguments = {
  prefix: string;
};

export default PrefixCommand;
