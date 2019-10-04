const { Command } = require('klasa');
const emoji = require('../../../util/emoji');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['leave'],
      cooldown: 5,
      description: (lang) => lang.get('STOP_DESCRIPTION'),
    });
  }

  async run(msg, [...paran]) {
    if (!msg.checkVoicePermission()) return;
    const lang = msg.language;
    const emojis = this.client.emojis;
    const pm = this.client.music.get('pm');
    pm.leave(msg.guild.id);
    this.client.music.delete(msg.guild.id);

    msg.genEmbed()
        .setTitle(`${emojis.get(emoji.stop)} ${lang.get('STOP')}`)
        .setDescription(lang.get('STOPPING'))
        .send();
  }
};
