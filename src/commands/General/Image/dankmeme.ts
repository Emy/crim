import { MessageEmbed } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['meme'],
      description: (lang) => lang.get('DANKMEME_DESCRIPTION'),
    });
  }

  async run(msg: KlasaMessage) {
    const lang = msg.language;
    let data = await (
      await fetch(`https://www.reddit.com/user/emdix/m/dankmemes/top/.json?sort=top&t=day&limit=500`)
    ).json();
    if (!(data || data.data)) return msg.send(msg.language.get('NO_DATA'));
    data = data.data.children;
    const dankmeme = data[Math.floor(Math.random() * data.length)].data;
    const embed = new MessageEmbed()
      .setTitle(dankmeme.title)
      .setImage(dankmeme.url)
      .setFooter(
        `${lang.get('FOOTER_REQUESTED_BY')}: ${msg.author.tag} | ${lang.get('FOOTER_PROVIDED_BY')}: reddit.com`,
        msg.author.avatarURL({ format: 'jpg' }),
      )
      .setTimestamp();
    return msg.send(embed);
  }
}
