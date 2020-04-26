import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      enabled: false,
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (lang) => lang.get('GASM_DESCRIPTION'),
    });
  }

  async run(msg: KlasaMessage) {
    // const cuddle = await nekos.nsfw.gasm();
    // const embed = new MessageEmbed().setImage(cuddle.url);
    // return msg.send(embed);
    return msg.send(null);
  }
}
