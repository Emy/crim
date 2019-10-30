const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['ATTACH_FILES'],
      aliases: ['emote'],
      cooldown: 3,
      description: (lang) => lang.get('EMOJI_DESCRIPTION'),
      usage: '<emoji:emoji>',
    });
  }

  async run(msg, [emoji]) {
    msg.send(new MessageAttachment(emoji.url));
  }
};
