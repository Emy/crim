const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      nsfw: true,
      description: (lang) => lang.get('BOOBS_DESCRIPTION'),
    });
  }

  async run(msg, [...params]) {
    try {
      const data = await (await fetch('https://nekos.life/api/v2/img/boobs')).json();
      if (!(data || data.url)) return msg.sendError('NO_DATA');
      msg.genEmbed()
          .setProvidedBy('nekos.life')
          .setImage(data.url)
          .send();
    } catch (error) {
      return msg.sendError('REQUEST_FAILED');
    }
  }
};
