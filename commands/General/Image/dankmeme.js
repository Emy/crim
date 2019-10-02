const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['meme'],
      description: (lang) => lang.get('DANKMEME_DESCRIPTION'),
    });
  }

  async run(msg, [...params]) {
    try {
      let data = await (await fetch(`https://www.reddit.com/user/emdix/m/dankmemes/top/.json?sort=top&t=day&limit=500`)).json();
      if (!(data || data.data)) return msg.sendError('NO_DATA');
      data = data.data.children;
      const dankmeme = data[Math.floor(Math.random() * data.length)].data;
      msg.genEmbed()
          .setTitle(dankmeme.title)
          .setImage(dankmeme.url)
          .setProvidedBy('reddit.com')
          .send();
    } catch (error) {
      return msg.sendError('REQUEST_FAILED');
    }
  }
};
