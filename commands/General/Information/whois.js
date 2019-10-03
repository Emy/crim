const { Command } = require('klasa');
const emoji = require('../../../util/emoji');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      enabled: false,
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['info'],
      cooldown: 5,
      description: (lang) => lang.get('WHOIS_DESCRIPTION'),
      usage: '<member:member>',
    });
  }

  async run(msg, [member]) {
    const emojis = this.client.emojis;
    let roles = '';
    member.roles.map((r) => r.name != '@everyone' ? roles += `${r.name} ` : '');
    msg.genEmbed()
        .setTitle(`${emojis.get(emoji.id)} ${member.user.username}`)
        .setThumbnail(member.user.avatarURL())
        .addField(lang.get('NAME'), member.user.tag, true)
        .addField(lang.get('USER_ID'), member.user.id, true)
        .addField(lang.get('CREATED_AT'), member.user.createdAt, true)
        .addField(lang.get('ROLES'), roles)
        .send();
  }
};
