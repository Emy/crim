const { Command, RichDisplay } = require('klasa');
const fetch = require('node-fetch');
const anilistQuery = require('../../../util/anilistQuery');
const emoji = require('../../../util/emoji');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'MANAGE_MESSAGES'],
      cooldown: 10,
      description: (lang) => lang.get('ANIME_DESCRIPTION'),
      usage: '<anime:string>',
    });
  }

  async run(msg, [anime]) {
    const lang = msg.language;
    const query = anilistQuery.query;
    const variables = {
      title: anime,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

    try {
      const data = await (await fetch('https://graphql.anilist.co', options)).json();
      const media = data.data.Media;
      if (!media) return msg.sendError('NO_ANIME_FOUND', anime);

      const startDate = new Date(media.startDate.year, media.startDate.month-1, media.startDate.day);
      const endDate = new Date(media.endDate.year, media.endDate.month-1, media.endDate.day);
      const title = media.title.english || media.title.romaji;

      const display = new RichDisplay();

      const score = `${(media.meanScore/10).toFixed(1)} / 10`;
      const status = media.status;
      const genres = media.genres.join(', ');

      const embed = msg.genEmbed()
          .setThumbnail(media.coverImage.large)
          .setTitle(title)
          .setURL(`https://anilist.co/anime/${media.id}`)
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
        const embed = msg.genEmbed()
            .setThumbnail(chara.node.image.large)
            .setTitle(title)
            .setURL(`https://anilist.co/anime/${media.id}`)
            .addField(lang.get('NAME'), fullName, true)
            .addField(lang.get('ROLE'), role, true)
            .addField(lang.get('DESCRIPTION'), description);
        display.addPage(embed);
      });

      display.setEmojis({
        first: emoji.previous,
        back: emoji.back,
        forward: emoji.forward,
        last: emoji.next,
        jump: emoji.page,
        stop: emoji.stop,
      });

      return display.run(msg, {
        'jump': true,
        'stop': false,
        'firstLast': false,
        'time': 120000});
    } catch (error) {
      this.client.console.error(error);
    }
  }
};
