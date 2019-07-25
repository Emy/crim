const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: [],
      cooldown: 0,
      description: (language) => language.get('COMMAND_ANIMEME_DESCRIPTION'),
    });
  }

  async run(message, [...params]) {
    let data;
    try {
      const response = await fetch(`https://www.reddit.com/user/emdix/m/animemes/top/.json?sort=top&t=day&limit=500`);
      data = JSON.parse(await response.text());
    } catch (error) {
      return message.sendError('ERROR_REST_REQUEST_FAILED');
    }

    if (!(data || data.data)) return message.sendError('ERROR_REST_NO_DATA');
    const index = Math.floor(Math.random() * data.data.children.length);
    new MessageEmbed()
        .init(message)
        .setImage(data.data.children[index].data.url)
        .setProvidedBy('reddit.com')
        .send();
  }
};
