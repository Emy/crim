const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['trump'],
      cooldown: 5,
      description: (language) => language.get('COMMAND_DONALD_DESCRIPTION'),
    });
  }

  async run(message, [...params]) {
    const response = await fetch('https://api.tronalddump.io/random/quote');
    const data = await response.json();

    const subject = data.tags[0] ? `about ${data.tags[0]}` : '';

    new MessageEmbed()
        .init(message)
        .setTitle(`**${data._embedded.author[0].name}** tweeted ${subject}`)
        .setURL(data._embedded.source[0].url)
        .setDescription(data.value)
        .setThumbnail('http://avatars.io/twitter/realDonaldTrump')
        .setProvidedBy('tronalddump.io')
        .send();
  }
};
