import { Argument, Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      requiredPermissions: ['SEND_MESSAGES', 'MANAGE_EMOJIS'],
      aliases: ['steal'],
      cooldown: 3,
      permissionLevel: 6,
      description: (lang) => lang.get('STEALEMOJI_DESCRIPTION'),
      usage: '<name:string> <emoji:...string>',
      usageDelim: ' ',
    });
  }

  async run(msg: KlasaMessage, [name, content]: [string, string]) {
    if (!Argument.regex.emoji.test(content)) return msg.sendLocale('NO_CUSTOM_EMOJI_DETECTED');
    const match = Argument.regex.emoji.exec(content)[0];
    const emoji = match.replace('<', '').replace('>', '').split(':');
    const ext = emoji[0] == 'a' ? 'gif' : 'png';
    const stolenEmoji = await msg.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emoji[2]}.${ext}`, name);
    return msg.sendLocale('EMOJI_STOLEN', [stolenEmoji]);
  }
}
