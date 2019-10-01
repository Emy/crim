const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text', 'group'],
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (language) => language.get('COMMAND_PAT_DESCRIPTION'),
      usage: '<member:member>',
    });
  }

  async run(message, [member]) {
    let data;
    try {
      const response = await fetch('https://nekos.life/api/v2/img/pat');
      data = await response.json();
    } catch (error) {
      return message.sendError('ERROR_REST_REQUEST_FAILED');
    }

    if (!(data || data.url)) return message.sendError('ERROR_REST_NO_DATA');
    new MessageEmbed()
        .init(message)
        .setEmoteTitle(author.username, user.username, 'EMOTE_PAT', true)
        .setProvidedBy('nekos.life')
        .setImage(data.url)
        .send();
  }
};
