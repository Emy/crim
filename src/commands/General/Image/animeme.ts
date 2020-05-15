import { MessageEmbed } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      requiredPermissions: [],
      cooldown: 0,
      description: (lang) => lang.get('ANIMEME_DESCRIPTION'),
    });
  }

  async run(msg: KlasaMessage) {
    const lang = msg.language;
    const response = await fetch(`https://www.reddit.com/user/emdix/m/animemes/top/.json?sort=top&t=day&limit=500`);
    let data = await response.json();
    if (!(data || data.data)) return msg.send(msg.language.get('NO_DATA'));
    data = data.data.children;
    const animeme = data[Math.floor(Math.random() * data.length)].data;
    const embed = new MessageEmbed()
      .setDescription(animeme.title)
      .setImage(animeme.url)
      .setFooter(
        `${lang.get('FOOTER_REQUESTED_BY')}: ${msg.author.tag} | ${lang.get('FOOTER_PROVIDED_BY')}: reddit.com`,
        msg.author.avatarURL({ format: 'jpg' }),
      )
      .setTimestamp();
    return msg.send(embed);
  }
}
