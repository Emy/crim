const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['trump'],
      cooldown: 5,
      description: (lang) => lang.get('DONALD_DESCRIPTION'),
    });
  }

  async run(msg, [...params]) {
    const lang = msg.language;
    const data = await (await fetch('https://api.tronalddump.io/random/quote')).json();
    const subject = data.tags[0] ? `${lang.get('ABOUT')} ${data.tags[0]}` : '';
    msg.genEmbed()
        .setTitle(`**${data._embedded.author[0].name}** ${lang.get('TWEETED')} ${subject}`)
        .setURL(data._embedded.source[0].url)
        .setDescription(data.value)
        .setThumbnail('http://avatars.io/twitter/realDonaldTrump')
        .setProvidedBy('tronalddump.io')
        .send();
  }
};
