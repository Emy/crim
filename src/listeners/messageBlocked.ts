import { Listener } from 'discord-akairo';
import {Logger} from 'tslog';
import { MessageEmbed } from 'discord.js';
import { LoggerUtil } from '../logger.util';

const logger: Logger = LoggerUtil.getInstance().createChildLogger();

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
    let embedTitle: string = null;
    switch (reason) {
      case 'filter':
        embedTitle = 'Automod - Word filter';
        break;
      case 'antiInvite':
        embedTitle = 'Automod - Anti invite';
        break;
      default:
        break;
    }
    if (embedTitle) {
      embed
        .setTitle(embedTitle)
        .setAuthor({ name: msg.author.tag, iconURL: msg.author.avatarURL({ format: 'jpg' }) })
        .setColor('BLUE')
        .addFields([
          {
            name: 'Offender',
            value: msg.author,
            inline: true,
          },
          {
            name: 'Warnpoints',
            value: '0',
            inline: true,
          },
          {
            name: 'Content',
            value: msg.content,
          },
        ])
        .setTimestamp();
      msg.channel.send(embed);
    }
  }
}

export default MessageBlockedListener;
