import { MessageEmbed } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';
import { URL } from 'url';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 10,
      description: (lang) => lang.get('KIDOL_DESCRIPTION'),
    });
  }

  async run(msg: KlasaMessage) {
    const lang = msg.language;
    let data = await (await fetch('http://www.kapi.xyz/api/v1/idols/random/')).json();
    if (!data) return msg.sendLocale('NO_DATA');
    data = data[Object.keys(data)[0]];
    const imageUrl = new URL(data[Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)]]);
    const groupAndIdol = imageUrl.pathname.split('/').slice(4, 6);
    const embed = new MessageEmbed()
      .setTitle(msg.language.get('TITLE_KIDOL', groupAndIdol[0], groupAndIdol[1]))
      .setImage(imageUrl.toString())
      .setFooter(
        `${lang.get('FOOTER_REQUESTED_BY')}: ${msg.author.tag} | ${lang.get('FOOTER_PROVIDED_BY')}: kapi.xyz`,
        msg.author.avatarURL({ format: 'jpg' }),
      )
      .setTimestamp();
    msg.send(embed);
  }
}
