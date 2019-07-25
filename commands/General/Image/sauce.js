const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');
const SauceNAO = require('saucenao');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['source'],
      cooldown: 30,
      description: (language) => language.get('COMMAND_SAUCE_DESCRIPTION'),
      usage: '<image:string>',
    });
  }

  async run(message, [image]) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (!image.match(expression)) throw 'No valid URL...';
    const response = (await SauceNAO(image)).json;
    if (!response || !response.results) throw 'No source found...';
    const results = response.results.slice(0, 10);

    const display = new RichDisplay()
        .setFooterSuffix(` | Requested by ${message.author.tag} | Provided by Urban Dictionary`)
        ;

    results.forEach((sauce) => {
      const embed = new MessageEmbed()
          .setTitle(message.language.get('TITLE_SAUCE_EMBED'))
          .setThumbnail(sauce.header.thumbnail)
          .addField(message.language.get('FIELD_SIMILARITY'), sauce.header.similarity ? sauce.header.similarity : 'Nothing found.')
          .addField(message.language.get('FIELD_SAUCE'), sauce.data.source ? sauce.data.source : 'Nothing found.', true)
          .addField(message.language.get('FIELD_PART'), sauce.data.part ? sauce.data.part : 'Nothing found.', true)
          .addField(message.language.get('FIELD_YEAR'), sauce.data.year ? sauce.data.year : 'Nothing found.', true)
          .addField(message.language.get('FIELD_ESTIMATED_TIMESTAMP'), sauce.data.est_time ? sauce.data.est_time : 'Nothing found.', true)
          .setTimestamp()
          .setFooter(message.language.get('FOOTER_REQUESTED_PROVIDED_BY', message.author.tag, 'saucenao.com'));
      display.addPage(embed);
    });

    return display.run(message, {
      'jump': false, 'stop': false, 'firstLast': false, 'max': 15, 'time': 30000});
  }
};
