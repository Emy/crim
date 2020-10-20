import { Listener } from 'discord-akairo';
import { getLogger } from '@log4js2/core';
import { MessageEmbed } from 'discord.js';

const logger = getLogger('Crim');

class MessageBlockedListener extends Listener {
  constructor() {
    super('messageBlocked', {
      emitter: 'commandHandler',
      event: 'messageBlocked',
    });
  }

  exec(msg, reason) {
    if (reason === 'client') return;
    logger.debug(`MESSAGE BLOCKED LISTENER INVOKED - Reason: ${reason}`);
    const embed = new MessageEmbed();
    switch (reason) {
      case 'filter':
        embed
          .setTitle('Automod - Word filter')
          .setAuthor(msg.author.tag, msg.author.avatarURL({ format: 'jpg' }))
          .setColor('BLUE')
          .addField('Offender', msg.author, true)
          .addField('Warnpoints', 0, true)
          .addField('Content', msg.content)
          .setTimestamp();
        msg.channel.send(embed);
        break;
      case 'antiInvite':
        embed
          .setTitle('Automod - Anti invite')
          .setAuthor(msg.author.tag, msg.author.avatarURL({ format: 'jpg' }))
          .setColor('BLUE')
          .addField('Offender', msg.author, true)
          .addField('Warnpoints', 0, true)
          .addField('Content', msg.content)
          .setTimestamp();
        msg.channel.send(embed);
        break;
      default:
        break;
    }
  }
}

export default MessageBlockedListener;
