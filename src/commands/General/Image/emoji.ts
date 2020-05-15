import { MessageAttachment } from 'discord.js';
import { Argument, Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      requiredPermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
      aliases: ['emote'],
      cooldown: 3,
      description: (lang) => lang.get('EMOJI_DESCRIPTION'),
      usage: '<content:string>',
    });
  }

  async run(msg: KlasaMessage, [content]: [string]) {
    if (!Argument.regex.emoji.test(content)) return msg.send('No emoji found');
    const emoji = Argument.regex.emoji.exec(content)[0].replace('<', '').replace('>', '').split(':');
    const ext = emoji[0] == 'a' ? 'gif' : 'png';
    const attachment = new MessageAttachment(`https://cdn.discordapp.com/emojis/${emoji[2]}.${ext}`);
    return msg.send(attachment);
  }
}
