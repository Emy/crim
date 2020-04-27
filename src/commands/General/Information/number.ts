import { MessageEmbed } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import nhentai from 'nhentai-js';
export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      enabled: true,
      requiredPermissions: [],
      nsfw: true,
      description: (language) => language.get('NUMBER_DESCRIPTION'),
      usage: '<number:string>',
    });
  }

  async run(msg: KlasaMessage, [number]: [string]) {
    const lang = msg.language;
    if (!nhentai.exists(number)) return msg.send('no hentai found...');
    const doujin = await nhentai.getDoujin(number);
    const embed = new MessageEmbed()
      .setTitle(doujin.title)
      .setURL(doujin.link)
      .setThumbnail(doujin.thumbnails[0])
      .addField(
        msg.language.get('ARTIST'),
        doujin.details.artists.map((artist) => artist.split('(')[0].trim()).join(', '),
      )
      .addField(msg.language.get('TAGS'), doujin.details.tags.map((tags) => tags.split('(')[0].trim()).join(', '))
      .setFooter(
        `${lang.get('FOOTER_REQUESTED_BY')}: ${msg.author.tag} | ${lang.get('FOOTER_PROVIDED_BY')}: nhentai.net`,
        msg.author.avatarURL({ format: 'jpg' }),
      )
      .setTimestamp();
    return msg.send(embed);
  }
}
