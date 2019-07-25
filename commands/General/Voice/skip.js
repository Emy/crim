const { Command } = require('klasa');
const { MessageEmbed, Collection } = require('discord.js');
const { PlayerManager } = require('discord.js-lavalink');

let playerManager;

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (language) => language.get('COMMAND_SKIP_DESCRIPTION'),
    });
  }

  async run(message, [...paran]) {
    if (this.client.music.get(message.guild.id) == undefined) return message.sendLocale('ERROR_LAVALINK_NO_MUSIC_RUNNING');
    if (!message.member.voice.channel || (this.client.music.get(message.guild.id).channel !== message.member.voice.channel.id)) throw 'You need to be in the Voice channel where the bot is in.';
    this.client.music.get(message.guild.id).stop();

    const embed = new MessageEmbed()
        .setColor('#dd67ff')
        .setTimestamp()
        .setFooter(`Requested by: ${message.author.tag}`)
        ;

    if (this.client.music.get(message.guild.id) == undefined) {
      embed.setTitle(':interrobang: No music playing');
      embed.setColor('#ff0000');
    } else if (this.client.music.get(message.guild.id).paused) {
      clearTimeout(this.client.music.get(`${message.guild.id}_pause_timer`));
      this.client.music.delete(`${message.guild.id}_pause_timer`);

      this.client.music.get(message.guild.id).stop();
      embed.setTitle(':track_next: Skipping and resuming playback');
    } else {
      this.client.music.get(message.guild.id).stop();
      embed.setTitle(':track_next: Skipping track');
    }

    message.send(embed);
  }
};
