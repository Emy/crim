const { Command } = require('klasa');
const emoji = require('../../../util/emoji');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS', 'MANAGE_ROLES', 'MANAGE_CHANNELS'],
      permissionLevel: 6,
      description: (lang) => lang.get('LOCK_DESCRIPTION'),
    });
  }

  async run(msg, [...params]) {
    const everyone = msg.guild.roles.first();
    const bool = msg.channel.permissionsFor(everyone).has('SEND_MESSAGES');
    try {
      await msg.channel.updateOverwrite(everyone, {SEND_MESSAGES: !bool});
      const icon = this.client.emojis.get(bool ? emoji.lock : emoji.unlock);
      const titleLocalized = bool ? 'CHANNEL_LOCKED' : 'CHANNEL_UNLOCKED';
      msg.genEmbed()
          .setTitle(`${icon} ${msg.language.get(titleLocalized)}`)
          .setColor(bool ? '#ff8b94' : '#a8e6cf')
          .send();
    } catch (err) {
    }
  }
};
