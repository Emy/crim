const { Command, RichDisplay } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['q'],
      cooldown: 5,
      description: (lang) => lang.get('QUEUE_DESCRIPTION'),
    });
  }

  async run(msg, [...params]) {
    if (!msg.checkVoicePermission()) return;
    const lang = msg.language;
    const player = this.client.music.get(msg.guild.id);

    // Create the rich display
    const display = new RichDisplay();

    let embed = msg.genEmbed().setTitle(lang.get('QUEUE'));

    // Add all songs to RichDisplay
    for (let i = 0; i < player.songs.length; i++) {
      embed.addField(
          player.songs[i].info.title,
          msg.genHMDTime(player.songs[i].info.length),
      );

      // Split content into pages by creating a new every 10 entries, unless its 0.
      if (!(i % 9) && i !== 0) {
        display.addPage(embed);
        embed = msg.genEmbed().setTitle(lang.get('QUEUE'));
      }
    }

    // Add current page unless it is a multiple of 10 (in which case it would have already been added)
    if (player.songs.length % 10) display.addPage(embed);

    // Send the RichDisplay with 30 seconds timeout
    return display.run(msg, {
      'jump': false,
      'stop': false,
      'firstLast': false,
      'time': 30000,
    });
  }
};
