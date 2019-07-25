const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text', 'group'],
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (language) => language.get('COMMAND_KISS_DESCRIPTION'),
      usage: '<member:member>',
    });
  }

  async run(message, [member]) {
    let data;
    const author = message.author;
    const user = member.user;
    try {
      const response = await fetch('https://nekos.life/api/v2/img/kiss');
      data = await response.json();
    } catch (error) {
      return message.sendError('ERROR_REST_REQUEST_FAILED');
    }

    if (!(data || data.url)) return message.sendError('ERROR_REST_NO_DATA');
    message.genEmbed()
        .setEmoteTitle(author.username, user.username, 'EMOTE_KISS', true)
        .setProvidedBy('nekos.life')
        .setImage(data.url)
        .send();
  }
};
