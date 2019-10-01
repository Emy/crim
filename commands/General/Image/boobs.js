const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      nsfw: true,
      description: (language) => language.get('COMMAND_BOOBS_DESCRIPTION'),
    });
  }

  async run(message, [...params]) {
    let data;
    try {
      const response = await fetch('https://nekos.life/api/v2/img/boobs');
      data = await response.json();
    } catch (error) {
      return message.sendError('ERROR_REST_REQUEST_FAILED');
    }

    if (!(data || data.url)) return message.sendError('ERROR_REST_NO_DATA');
    new MessageEmbed()
        .init(message)
        .setProvidedBy('nekos.life')
        .setImage(data.url)
        .send();
  }
};
