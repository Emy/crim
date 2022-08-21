import Anilist, { AnimeEntry } from 'anilist-node';
import { EmbedFieldData, Message, MessageEmbed } from 'discord.js';
import { Command } from 'discord-akairo';

const anilist = new Anilist();

class AnimeCommand extends Command {
  constructor() {
    super('anime', {
      aliases: ['anime'],
      channel: 'guild',
      description: ['Get information about an anime.', 'Usage: `anime <animeName>`'],
      args: [
        {
          id: 'anime',
          type: 'string',
          match: 'text',
          default: '',
        },
      ],
    });
  }

  async exec(message: Message, args: AnimeCommandArguments) {
    const searchTerm = args.anime;
    if (!searchTerm) return message.channel.send('No Anime specified.');
    const search = await anilist.searchEntry.anime(searchTerm, null, 1, 1);
    if (!search?.pageInfo.total) return message.channel.send('No anime found');
    const anime = await anilist.media.anime(search.media[0].id);
    const newFields: EmbedFieldData[] = this.createFields(anime)
    const embed = new MessageEmbed()
      .setAuthor({name: anime.title.english ?? anime.title.romaji, iconURL: 'https://anilist.co/favicon.ico', url: anime.siteUrl})
      .setThumbnail(anime.coverImage.large)
      .setColor('#89cff0')
      .setDescription(anime.description.replace(/<[^>]*>?/gm, ''))
      .addFields(newFields)
      .setFooter({
        text: `Requested by: ${message.author.tag} | Provided by anilist.co`,
        iconURL: message.author.avatarURL({ format: 'jpg' })
      }
      );
    return message.channel.send({embeds: [embed]});
  }

  private createFields(anime: AnimeEntry): EmbedFieldData[] {
    return [
      {
        name: 'Score',
        value: `${(anime.meanScore / 10).toFixed(1)} / 10`,
        inline: true,
      },
      {
        name: 'Start Date',
        value: `${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}`,
        inline: true,
      },
      {
        name: 'Episodes',
        value: `${anime.episodes}`,
        inline: true,
      },
      {
        name: 'Studio(s)',
        value: `${anime.studios
          .map((studio) => `[${studio.name}](https://anilist.co/studio/${studio.id})`)
          .join(', ')}`,
        inline: false,
      },
      {
        name: 'Genre(s)',
        value: `${anime.genres
          .map((genre) => `[${genre}](https://anilist.co/search/anime/${encodeURI(genre)})`)
          .join(', ')}`,
        inline: false,
      },
    ];
  }
}

type AnimeCommandArguments = {
  anime: string;
};

export default AnimeCommand;
