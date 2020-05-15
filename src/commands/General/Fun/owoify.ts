import { Command, CommandStore, KlasaClient } from 'klasa';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      enabled: false,
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['owo'],
      cooldown: 5,
      description: (lang) => lang.get('OWOIFY_DESCRIPTION'),
      usage: '<text:string>',
    });
  }

  async run(msg, [text]) {
    const owoified = text.replace(/r|l/g, 'w').replace(/R|L/g, 'W').replace(/owo/i, 'OwO').replace(/uwu/i, 'UwU');
    msg.genEmbed().addField('OwOified', owoified).addField('Original', text).send();
    if (msg.deletable) await msg.delete();
    return null;
  }
}
