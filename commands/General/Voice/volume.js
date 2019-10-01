const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      requiredPermissions: [],
      cooldown: 5,
      description: (language) => language.get('COMMAND_VOLUME_DESCRIPTION'),
      usage: '[volume:int]',
    });
  }

  async run(message, [volume]) {
    if (this.client.music.get(message.guild.id) == undefined) return message.sendLocale('ERROR_LAVALINK_NO_MUSIC_RUNNING');
    if (!message.member.voice.channel || (this.client.music.get(message.guild.id).channel !== message.member.voice.channel.id)) throw 'You need to be in the Voice channel where the bot is in.';
    if (volume === undefined) message.send(`Volume is at: ${this.client.music.get(message.guild.id).state.volume}%`);
    if (volume <= 0 || volume > 200) throw 'Volume restriction! (1-200%)';
    this.client.music.get(message.guild.id).volume(volume);
  }
};
