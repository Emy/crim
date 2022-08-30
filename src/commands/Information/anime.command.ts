import Anilist, { AnimeEntry } from 'anilist-node';
import { CacheType, CommandInteraction, EmbedFieldData, MessageEmbed } from 'discord.js';
import { Command } from '../../framework/command/command';

const anilist = new Anilist();

export default class AnimeCommand extends Command {
  constructor() {
    super('anime', {
      description: 'Get information about an anime.',
      usage: [{ optionName: 'String', description: 'name of the anime', required: true, name: 'anime' }],
    });
  }

  public async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
    const searchTerm = interaction.options.getString('anime');
    const search = await anilist.searchEntry.anime(searchTerm, null, 1, 1);
    if (!search?.pageInfo.total) return interaction.reply('No anime found');
    const anime = await anilist.media.anime(search.media[0].id);
    const newFields: EmbedFieldData[] = this.createFields(anime);
    const embed = new MessageEmbed()
      .setAuthor({
        name: anime.title.english ?? anime.title.romaji,
        iconURL: 'https://anilist.co/favicon.ico',
        url: anime.siteUrl,
      })
      .setThumbnail(anime.coverImage.large)
      .setColor('#89cff0')
      .setDescription(anime.description.replace(/<[^>]*>?/gm, ''))
      .addFields(newFields)
      .setFooter({
        text: `Requested by: ${interaction.user.tag} | Provided by anilist.co`,
        iconURL: interaction.user.avatarURL({ format: 'jpg' }),
      });
    return interaction.reply({ embeds: [embed] });
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
