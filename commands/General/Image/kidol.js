const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 10,
      description: (lang) => lang.get('KIDOL_DESCRIPTION'),
    });
  }

  async run(msg, [...params]) {
    try {
      let data = await (await fetch('http://www.kapi.xyz/api/v1/idols/random/')).json();
      if (!data) return msg.sendError('NO_DATA');
      data = data[Object.keys(data)[0]];
      const imageUrl = new URL(data[Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)]]);
      const groupAndIdol = imageUrl.pathname.split('/').slice(4, 6);
      msg.genEmbed()
          .setTitle(msg.language.get('TITLE_KIDOL', groupAndIdol[0], groupAndIdol[1]))
          .setImage(imageUrl)
          .setProvidedBy('kapi.xyz')
          .send();
    } catch (error) {
      return msg.sendError('REQUEST_FAILED');
    }
  }
};
