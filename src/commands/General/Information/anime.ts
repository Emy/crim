import { MessageEmbed } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage, RichDisplay } from 'klasa';
import fetch from 'node-fetch';
import anilistQuery from '../../../util/anilistQuery';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      requiredPermissions: ['EMBED_LINKS', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'MANAGE_MESSAGES'],
      cooldown: 10,
      description: (lang) => lang.get('ANIME_DESCRIPTION'),
      usage: '<anime:string>',
    });
  }

  async run(msg: KlasaMessage, [anime]: [string]) {
    const lang = msg.language;
    const query = anilistQuery.query;
    const variables = {
      title: anime,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

    const data = await (await fetch('https://graphql.anilist.co', options)).json();
    const media = data.data.Media;
    if (!media) return msg.sendLocale('NO_ANIME_FOUND');

    const startDate = new Date(media.startDate.year, media.startDate.month - 1, media.startDate.day);
    const endDate = new Date(media.endDate.year, media.endDate.month - 1, media.endDate.day);
    const title = media.title.english || media.title.romaji;

    const display = new RichDisplay();

    const score = `${(media.meanScore / 10).toFixed(1)} / 10`;
    const status = media.status;
    const genres = media.genres.join(', ');

    const embed = new MessageEmbed()
      .setThumbnail(media.coverImage.large)
      .setTitle(title)
      .setURL(media.siteUrl)
      .addField(lang.get('SCORE'), score, true)
      .addField(lang.get('STATUS'), status, true)
      .addField(lang.get('START_DATE'), startDate.toDateString(), true)
      .addField(lang.get('END_DATE'), media.status != 'RELEASING' ? endDate.toDateString() : 'Not finished yet.', true)
      .addField(lang.get('GENRES'), genres)
      .setTimestamp();
    display.addPage(embed);

    media.characters.edges.forEach((chara) => {
      const role = chara.role || lang.get('NO_INFORMATION');
      const description = chara.node.description || lang.get('NO_INFORMATION');
      const firstName = chara.node.name.first || '';
      const lastName = chara.node.name.last || '';
      const nativeName = chara.node.name.native || '';
      const fullName = `${firstName} ${lastName} (${nativeName})`.trim();
      const embed = new MessageEmbed()
        .setThumbnail(chara.node.image.large)
        .setTitle(title)
        .setURL(`https://anilist.co/anime/${media.id}`)
        .addField(lang.get('NAME'), fullName, true)
        .addField(lang.get('ROLE'), role, true)
        .addField(lang.get('DESCRIPTION'), description);
      display.addPage(embed);
    });

    display.run(msg, {
      jump: true,
      stop: false,
      firstLast: false,
      time: 120000,
    });
    return null;
  }
}
