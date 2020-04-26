import { Command, CommandStore, KlasaClient } from 'klasa';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      requiredPermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
      aliases: ['emote'],
      cooldown: 3,
      description: (lang) => lang.get('EMOJI_DESCRIPTION'),
      usage: '<emoji:emoji>',
    });
  }

  async run(msg, [emoji]) {
    msg.genEmbed().setImage(emoji.url).send();
    if (msg.deletable) await msg.delete();
    return null;
  }
}
