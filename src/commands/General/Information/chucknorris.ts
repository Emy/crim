import { MessageEmbed } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (lang) => lang.get('CHUCKNORRIS_DESCRIPTION'),
    });
  }

  async run(msg: KlasaMessage) {
    const lang = msg.language;
    const data = await (await fetch(`https://api.chucknorris.io/jokes/random`)).json();
    if (!(data || data.value)) return msg.sendLocale('NO_DATA');
    const embed = new MessageEmbed()
      .setDescription(data.value)
      .setFooter(
        `${lang.get('FOOTER_REQUESTED_BY')}: ${msg.author.tag} | ${lang.get('FOOTER_PROVIDED_BY')}: chucknorris.io`,
        msg.author.avatarURL({ format: 'jpg' }),
      )
      .setTimestamp();
    return msg.send(embed);
  }
}
