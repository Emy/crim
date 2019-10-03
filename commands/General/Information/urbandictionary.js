const { Command, RichDisplay } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['define', 'ud'],
      cooldown: 60,
      description: (lang) => lang.get('URBANDICTIONARY_DESCRIPTION'),
      usage: '<searchterm:string>',
    });
  }

  async run(msg, [searchterm]) {
    const lang = msg.language;
    const data = await (await fetch(`http://api.urbandictionary.com/v0/define?term=${encodeURIComponent(searchterm)}`)).json();

    if (data.list.length == 0) return msg.sendError('NO_UD_FOUND', searchterm);

    const display = new RichDisplay()
        .setFooterSuffix(` | Requested by ${msg.author.tag} | Provided by Urban Dictionary`);

    data.list.forEach(function(page) {
      /* For the description and the example,
       * remove all the square brackets, as they
       * were used for links before, and those no longer exist.
       * Also cut them all down to fit into the maximum size of an Embed Field.
       */
      const description = page.definition.replace(/[\[\]]/g, '').substr(0, 1022);
      const example = page.example.replace(/[\[\]]/g, '').substr(0, 1022);

      const embed = msg.genEmbed()
          .setTitle(`__**${page.word}**__`.substr(0, 255))
          .setURL(page.permalink)
          .addField(lang.get('DEFINITION'), description ? description : lang.get('NO_INFORMATION'))
          .addField(lang.get('EXAMPLE'), example ? example : lang.get('NO_INFORMATION'));
      display.addPage(embed);
    });

    return display.run(msg, {
      'jump': false,
      'stop': false,
      'firstLast': false,
      'time': 30000,
    });
  }
};
