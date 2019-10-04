const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      requiredPermissions: [],
      aliases: ['l'],
      cooldown: 5,
      description: (lang) => lang.get('LOOP_DESCRIPTION'),
    });
  }

  async run(msg, [...params]) {
    if (!msg.checkVoicePermission()) return;
    const player = this.client.music.get(msg.guild.id);
    player.loop = !player.loop;
    const title = player.loop ? 'LOOPED' : 'UNLOOPED';
    const desc = player.loop ? 'LOOPED_DESCRIPTION' : 'UNLOOPED_DESCRIPTION';

    msg.genEmbed()
        .setTitle(msg.language.get(title))
        .setDescription(msg.language.get(desc))
        .send();
  }
};
