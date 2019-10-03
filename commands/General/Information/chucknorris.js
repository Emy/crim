const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (lang) => lang.get('CHUCKNORRIS_DESCRIPTION'),
    });
  }

  async run(msg, [...params]) {
    try {
      const data = await (await fetch(`https://api.chucknorris.io/jokes/random`)).json();
      if (!(data || data.value)) return msg.sendError('NO_DATA');
      msg.genEmbed()
          .setDescription(data.value)
          .setProvidedBy('chucknorris.io')
          .send();
    } catch (error) {
      return msg.sendError('REQUEST_FAILED');
    }
  }
};
