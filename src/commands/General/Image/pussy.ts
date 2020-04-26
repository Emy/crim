import { MessageEmbed } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import Client from 'nekos.life';
const nekos = new Client();

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (lang) => lang.get('PUSSY_DESCRIPTION'),
    });
  }

  async run(msg: KlasaMessage) {
    const pussy = await nekos.nsfw.pussyGif();
    const embed = new MessageEmbed().setImage(pussy.url);
    return msg.send(embed);
  }
}
