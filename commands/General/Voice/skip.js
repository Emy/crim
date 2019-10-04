const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (lang) => lang.get('SKIP_DESCRIPTION'),
    });
  }

  async run(msg, [...paran]) {
    if (!msg.checkVoicePermission()) return;
    const lang = msg.language;
    const player = this.client.music.get(msg.guild.id);
    msg.genEmbed()
        .setTitle(lang.get('SKIP'))
        .setDescription(lang.get('SKIPPING_TRACK'))
        .send();
    player.stop();
  }
};
