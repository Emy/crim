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
      description: (lang) => lang.get('BOOBS_DESCRIPTION'),
    });
  }

  async run(msg: KlasaMessage) {
    const boobs = await nekos.nsfw.boobs();
    const embed = new MessageEmbed().setImage(boobs.url);
    return msg.send(embed);
  }
}
