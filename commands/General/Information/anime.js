const { Command, RichDisplay } = require('klasa');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const anilistQuery = require('../../../util/anilistQuery');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 10,
      description: (language) => language.get('COMMAND_ANIME_DESCRIPTION'),
      usage: '<title:string>',
    });
  }

  async run(message, [title]) {
    let query = anilistQuery.query;
    const variables = {
      title: title,
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
      const response = await fetch('https://graphql.anilist.co', options);
      const data = await response.json();
      const media = data.data.Media;
      if (media === null) return this.sendNotFoundEmbed(message, anime);

      const startDate = new Date(media.startDate.year, media.startDate.month-1, media.startDate.day);
      const endDate = new Date(media.endDate.year, media.endDate.month-1, media.endDate.day);

      const display = new RichDisplay()
          .setFooterSuffix(` | Requested by ${message.author.tag} | Provided by Anilist.co`);

      const embed = new MessageEmbed()
          .setThumbnail(media.coverImage.large)
          .setColor('#dd67ff')
          .addField('Name', (media.title.english ? `[${media.title.english}]` : `[${media.title.romaji}]`) + `(https://anilist.co/anime/${media.id})`)
          .addField('Score', `${(media.meanScore/10).toFixed(1)} / 10`, true)
          .addField('Status', media.status, true)
          .addField('Start date', startDate.toDateString(), true)
          .addField('End date', media.status != 'RELEASING' ? endDate.toDateString() : 'Not finished yet.', true)
          .addField('Genres', media.genres.join(', '))
          .setTimestamp();
      display.addPage(embed);

      media.characters.edges.forEach((character) => {
        const embed = new MessageEmbed()
            .setThumbnail(character.node.image.large)
            .setTitle(media.title.english ? media.title.english : media.title.romaji)
            .setURL(`https://anilist.co/anime/${media.id}`)
            .addField('Name', `${character.node.name.first ? character.node.name.first : ''} ${character.node.name.last ? character.node.name.last : ''} (${character.node.name.native ? character.node.name.native : ''})`, true)
            .addField('Role', character.role, true)
            .addField('Description', character.node.description ? character.node.description : 'No description available.');
        display.addPage(embed);
      });

      return display.run(message, {
        'jump': true, 'stop': false, 'firstLast': false, 'max': 15, 'time': 120000});
    } catch (error) {
      this.client.console.error(error);
    }
  }

  sendNotFoundEmbed(message, anime) {
    const embed = new MessageEmbed()
        .setThumbnail()
        .setColor('#dd67ff')
        .addField('No Anime found', 'No anime found for: "' + anime + '" on Anilist.co')
        .setFooter(`Requested by: ${message.author.tag} | Provided by Anilist.co`)
        .setTimestamp()
            ;
    message.sendEmbed(embed);
  }
};
