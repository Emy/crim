const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      nsfw: true,
      description: (language) => language.get('COMMAND_NEKO_DESCRIPTION'),
    });
  }

  async run(message, [...params]) {
    let data;
    try {
      const response = await fetch(`https://nekos.moe/api/v1/random/image?limit=1&nsfw=${message.channel.nsfw}`);
      data = await response.json();
    } catch (error) {
      return message.sendError('ERROR_REST_REQUEST_FAILED');
    }
    if (!(data || data.images[0])) return message.sendError('ERROR_REST_NO_DATA');
    new MessageEmbed()
        .init(message)
        .setImage(`https://nekos.moe/image/${data.images[0].id}`)
        .setProvidedBy('nekos.moe')
        .send();
  }
};
