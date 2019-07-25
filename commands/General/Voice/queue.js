const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['q'],
      cooldown: 5,
      description: (language) => language.get('COMMAND_QUEUE_DESCRIPTION'),
    });
  }

  async run(message, [...params]) {
    if (this.client.music.get(message.guild.id) == undefined) return message.sendLocale('ERROR_LAVALINK_NO_MUSIC_RUNNING');
    if (!message.member.voice.channel || (this.client.music.get(message.guild.id).channel !== message.member.voice.channel.id)) throw 'You need to be in the Voice channel where the bot is in.';
    const player = this.client.music.get(message.guild.id);

    // Create the rich display
    const display = new RichDisplay()
        .setFooterSuffix(` | Requested by ${message.author.tag}`)
        ;

    let embed = new MessageEmbed()
        .setTitle('Current Queue')
        .setColor('#dd67ff')
        ;

    // Add all songs to RichDisplay
    for (let i = 0; i < player.songs.length; i++) {
      embed.addField(player.songs[i].info.title, `${moment(player.songs[i].info.length).format('mm:ss')}min`, false);

      // Split content into pages by creating a new every 10 entries, unless its 0.
      if (!(i % 9) && i !== 0) {
        display.addPage(embed);

        embed = new MessageEmbed()
            .setTitle('Current Queue')
            .setColor('#dd67ff')
        ;
      }
    }

    // Add current page unless it is a multiple of 10 (in which case it would have already been added)
    if (player.songs.length % 10) display.addPage(embed);

    // Send the RichDisplay with 15 Reactions max and 30 seconds timeout
    return display.run(await message.send('Loading...'), {
      'jump': false, 'stop': false, 'firstLast': false, 'max': 15, 'time': 30000});
  }
};
