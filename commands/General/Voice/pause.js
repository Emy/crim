const { Command } = require('klasa');
const emoji = require('../../../util/emoji');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (lang) => lang.get('PAUSE_DESCRIPTION'),
    });
  }

  async run(msg, [...param]) {
    if (!msg.checkVoicePermission()) return;
    const player = this.client.music.get(msg.guild.id);
    const lang = msg.language;
    if (player.paused) {
      player.resume();
    } else {
      player.pause();
    }
    const emojis = this.client.emojis;
    const icon = player.paused ? emojis.get(emoji.pause): emojis.get(emoji.play);
    const title = player.paused ? 'PAUSED' : 'UNPAUSED';
    msg.genEmbed()
        .setTitle(`${icon} ${lang.get(title)}`)
        .send();
  }
};
