const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: [],
      cooldown: 0,
      description: (lang) => lang.get('ANIMEME_DESCRIPTION'),
    });
  }

  async run(msg, [...params]) {
    try {
      let data = await (await fetch(`https://www.reddit.com/user/emdix/m/animemes/top/.json?sort=top&t=day&limit=500`)).json();
      if (!(data || data.data)) return msg.sendError('NO_DATA');
      data = data.data.children;
      const animeme = data[Math.floor(Math.random() * data.length)].data;
      msg.genEmbed()
          .setTitle(animeme.title)
          .setImage(animeme.url)
          .setProvidedBy('reddit.com')
          .send();
    } catch (error) {
      return msg.sendError('REQUEST_FAILED');
    }
  }
};
