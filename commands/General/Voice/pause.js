const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (language) => language.get('COMMAND_PAUSE_DESCRIPTION'),
    });
  }

  async run(message, [...param]) {
    const embed = new MessageEmbed()
        .setColor('#dd67ff')
        .setTimestamp()
        .setFooter(`Requested by: ${message.author.tag}`)
        ;

    if (this.client.music.get(message.guild.id) == undefined) {
      embed.setTitle(':interrobang: No music playing');
      embed.setColor('#ff0000');
    } else if (this.client.music.get(message.guild.id).paused) {
      this.client.music.get(message.guild.id).resume();
      embed.setTitle(':arrow_forward: Resuming playback...');

      clearTimeout(this.client.music.get(`${message.guild.id}_pause_timer`));
      this.client.music.delete(`${message.guild.id}_pause_timer`);
    } else {
      this.client.music.get(message.guild.id).pause();
      embed.setTitle(':pause_button: Pausing playback');

      const timer = setTimeout(() => {
        this.client.music.get('pm').leave(message.guild.id);
        this.client.music.delete(message.guild.id);
      }, 120000);

      this.client.music.set(`${message.guild.id}_pause_timer`, timer);
    }

    message.send(embed);
  }
};
