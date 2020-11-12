import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

class EmojiCommand extends Command {
  constructor() {
    super('emoji', {
      aliases: ['emoji', 'emote'],
      channel: 'guild',
      description: 'Show the emoji in the original (usually larger) size.',
      args: [
        {
          id: 'emoji',
          type: '/^<(a:)?(a-zA-Z0-9)*:(0-9)*>/',
          default: undefined,
        },
      ],
    });
  }

  async exec(message: Message, args: EmojiCommandArguments) {
    if (!args.emoji) return message.channel.send('No emoji found.');
    const regex = new RegExp(/<(a?):?(.*):([0-9]*)>/);
    const match = regex.exec(args.emoji);
    if (!match) return message.channel.send('No emoji found.');
    const emoji = `${match[3]}.${match[1] === 'a' ? 'gif' : 'png'}`;
    return message.channel.send(`https://cdn.discordapp.com/emojis/${emoji}`);
  }
}

type EmojiCommandArguments = {
  emoji: string;
};

export default EmojiCommand;
