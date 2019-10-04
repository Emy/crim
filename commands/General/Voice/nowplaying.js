const { Command } = require('klasa');
const { Util } = require('discord.js');
const emoji = require('../../../util/emoji');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['np'],
      cooldown: 5,
      description: (lang) => lang.get('NOWPLAYING_DESCRIPTION'),
    });
  }

  async run(msg, [...params]) {
    if (!msg.checkVoicePermission()) return;
    const lang = msg.language;
    const player = this.client.music.get(msg.guild.id);
    const song = player.songs[0];
    const emojis = this.client.emojis;
    msg.genEmbed()
        .setTitle(`${emojis.get(emoji.play)} ${lang.get('NOW_PLAYING')}`)
        .setDescription(Util.escapeMarkdown(song.info.title))
        .setThumbnail(`https://img.youtube.com/vi/${song.info.identifier}/default.jpg`)
        .addField(
            `${emojis.get(emoji.time)} ${lang.get('LENGTH')}`,
            msg.genHMDTime(song.info.length),
            true
        )
        .send();
  }
};
