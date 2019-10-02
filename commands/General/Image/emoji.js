const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['ATTACH_FILES'],
      aliases: ['emote'],
      cooldown: 3,
      description: (lang) => lang.get('EMOJI_DESCRIPTION'),
    });
  }

  async run(msg, [...params]) {
    const regex = new RegExp(/<(a?):(.*):([0-9]*)>/);
    if (!msg.args[0] || !msg.args[0].split(' ').length === 1) {
      return msg.sendError('NO_CUSTOM_EMOJI_DETECTED');
    }
    const pattern = msg.args[0].split(' ')[0];
    const matches = regex.exec(pattern);
    if (!matches) return msg.sendError('NO_CUSTOM_EMOJI_DETECTED');
    const emoji = `${matches[3]}.${matches[1] === 'a' ? 'gif' : 'png'}`;
    msg.send(new MessageAttachment(`https://cdn.discordapp.com/emojis/${emoji}`, emoji));
  }
};
