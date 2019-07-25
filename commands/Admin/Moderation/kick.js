const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      enabled: true,
      runIn: ['text'],
      requiredPermissions: ['KICK_MEMBERS'],
      cooldown: 0,
      guarded: true,
      permissionLevel: 6,
      description: (language) => language.get('COMMAND_KICK_DESCRIPTION'),
      usage: '<user:member> [reason:string]',
    });
  }

  async run(msg, [user, reason]) {
    const member = msg.member;
    const author = msg.author;
    const filo = this.client.user;
    reason = reason ? reason : msg.language.get('NO_REASON');
    if (author.id === user.id) return msg.sendError(msg, 'ERROR_KICK_YOURSELF');
    if (filo.id === user.id) return msg.sendError(msg, 'ERROR_KICK_ME');
    if (member.roles.highest.comparePositionTo(user.roles.highest) <= 0) {
      return msg.sendError('ERROR_KICK_HIGHER_ROLE');
    }
    if (!user.kickable) return msg.sendError(msg, 'ERROR_KICK_UNKICKABLE');
    await user.kick(reason);
    message.genEmbed()
        .setTitle('User kicked')
        .setThumbnail(user.user.avatarURL())
        .addField('👤 User', user.user.tag)
        .addField(msg.language.get('REASON'), reason)
        .send();
  }
};
