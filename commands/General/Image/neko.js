const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      nsfw: true,
      description: (lang) => lang.get('NEKO_DESCRIPTION'),
    });
  }

  async run(msg, [...params]) {
    try {
      const data = await (await fetch(`https://nekos.moe/api/v1/random/image?limit=1&nsfw=${msg.channel.nsfw}`)).json();
      if (!(data || data.images[0])) return msg.sendError('NO_DATA');
      msg.genEmbed()
          .setImage(`https://nekos.moe/image/${data.images[0].id}`)
          .setProvidedBy('nekos.moe')
          .send();
    } catch (error) {
      return msg.sendError('REQUEST_FAILED');
    }
  }
};
