const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      requiredPermissions: [],
      aliases: ['l'],
      cooldown: 5,
      description: (language) => language.get('COMMAND_LOOP_DESCRIPTION'),
    });
  }

  async run(message, [...paran]) {
    const player = this.client.music.get(message.guild.id);
    const voiceChannel = message.member.voice.channel;
    if (!player) return message.sendLocale('ERROR_LAVALINK_NO_MUSIC_RUNNING');
    if (!voiceChannel.channel || (player.channel !== voiceChannel.id)) throw 'You need to be in the Voice channel where the bot is in.';
    player.loop = !player.loop;
    message.send(`Loop: ${player.loop}`);
  }
};
