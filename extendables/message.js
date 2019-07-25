const { Extendable } = require('klasa');
const { Message } = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Extendable {
  constructor(...args) {
    super(...args, {
      enabled: true,
      appliesTo: [Message],
    });
  }

  genEmbed() {
    const embed = new MessageEmbed();
    embed.msg = this;
    embed.lang = this.language;
    const requestedBy = this.language.get('FOOTER_REQUESTED_BY');
    embed.setFooter(`${requestedBy} ${this.author.tag}`,
        this.author.avatarURL({format: 'jpg'}))
        .setTimestamp()
        .setColor('#dd67ff');
    return embed;
  }

  sendError(reason) {
    this.genEmbed()
        .setTitle(this.language.get('ERROR_TITLE'))
        .addField(this.language.get('ERROR_REASON'), this.language.get(reason))
        .setColor('#DC143C');
    this.send(embed);
  }
};
