const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (language) => language.get('COMMAND_CHUCKNORRIS_DESCRIPTION'),
    });
  }

  async run(message, [...params]) {
    let data;
    try {
      const response = await fetch(`https://api.chucknorris.io/jokes/random`);
      data = await response.json();
    } catch (error) {
      return message.sendError('ERROR_REST_REQUEST_FAILED');
    }

    if (!(data || data.value)) return message.sendError('ERROR_REST_NO_DATA');
    new MessageEmbed()
        .init(message)
        .addField('Chuck Norris', data.value)
        .setProvidedBy('chucknorris.io')
        .send();
  }
};
