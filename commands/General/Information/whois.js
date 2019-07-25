const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      enabled: true,
      runIn: ['text', 'group'],
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (language) => language.get('COMMAND_WHOIS_DESCRIPTION'),
      usage: '<member:user>',
    });
  }

  async run(message, [user]) {
    const embed = new MessageEmbed()
        .setThumbnail(user.avatarURL())
        .setColor('DARK_GREEN')
        .addField('Name:', user.tag)
        .addField('UserID:', user.id)
        .addField('Created at:', user.createdAt)
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
            ;
    message.send(embed);
  }
};
