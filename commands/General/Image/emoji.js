const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
      aliases: ['emote'],
      cooldown: 3,
      description: (lang) => lang.get('EMOJI_DESCRIPTION'),
      usage: '<emoji:emoji>',
    });
  }

  async run(msg, [emoji]) {
    msg.genEmbed()
        .setImage(emoji.url)
        .send();
    if (msg.deletable) await msg.delete();
  }
};
