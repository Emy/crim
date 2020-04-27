import Anilist from 'anilist-node';
import { MessageEmbed } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';

const anilist = new Anilist();

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      requiredPermissions: ['EMBED_LINKS', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'MANAGE_MESSAGES'],
      cooldown: 10,
      description: (lang) => lang.get('ANIME_DESCRIPTION'),
      usage: '<animeToSearch:string>',
    });
  }

  async run(msg: KlasaMessage, [animeToSearch]: [string]) {
    const lang = msg.language;
    const search = await anilist.search('anime', animeToSearch);
    if (!search?.pageInfo.total) return msg.sendLocale('NO_ANIME_FOUND', [animeToSearch]);
    const anime = await anilist.media.anime(search.media[0].id);
    const tags = [];
    anime.tags.map((tag) => {
      if (!tag.isMediaSpoiler) tags.push(tag.name);
    });
    const embed = new MessageEmbed()
      .setTitle(anime.title.english || anime.title.romaji)
      .setURL(anime.siteUrl)
      .setThumbnail(anime.coverImage.large)
      .addField(lang.get('SCORE'), `${(anime.meanScore / 10).toFixed(1)} / 10`, true)
      .addField(lang.get('START_DATE'), `${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}`, true)
      .addField('Studio', anime.studios[0].name, true)
      .addField(lang.get('GENRES'), anime.genres.join(', '))
      .addField(lang.get('DESCRIPTION'), anime.description.replace(/<[^>]*>?/gm, ''))
      .addField(lang.get('TAGS'), tags.join(', '))
      .setFooter(
        `${lang.get('FOOTER_REQUESTED_BY')}: ${msg.author.tag} | ${lang.get('FOOTER_PROVIDED_BY')}: anilist.co`,
        msg.author.avatarURL({ format: 'jpg' }),
      )
      .setTimestamp();
    return msg.send(embed);
  }
}
