import { MessageEmbed } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['trump'],
      cooldown: 5,
      description: (lang) => lang.get('DONALD_DESCRIPTION'),
    });
  }

  async run(msg: KlasaMessage) {
    const lang = msg.language;
    const data = await (await fetch('https://api.tronalddump.io/random/quote')).json();
    const subject = data.tags[0] ? `${lang.get('ABOUT')} ${data.tags[0]}` : '';
    const embed = new MessageEmbed()
      .setTitle(`**${data._embedded.author[0].name}** ${lang.get('TWEETED')} ${subject}`)
      .setURL(data._embedded.source[0].url)
      .setDescription(data.value)
      .setThumbnail('http://avatars.io/twitter/realDonaldTrump')
      .setFooter(
        `${lang.get('FOOTER_REQUESTED_BY')}: ${msg.author.tag} | ${lang.get('FOOTER_PROVIDED_BY')}: tronalddump.io`,
        msg.author.avatarURL({ format: 'jpg' }),
      )
      .setTimestamp();
    return msg.send(embed);
  }
}
