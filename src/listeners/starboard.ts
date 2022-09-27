import { Listener } from 'discord-akairo';
import { Logger } from 'tslog';
import { MessageReaction } from 'discord.js';
import { User } from 'discord.js';
import { LoggerUtil } from '../logger.util';

const logger: Logger = LoggerUtil.getInstance().createChildLogger();

class MessageBlockedListener extends Listener {
  constructor() {
    super('starboard', {
      emitter: 'client',
      event: 'messageReactionAdd',
    });
  }

  async exec(reaction: MessageReaction, user: User) {
    logger.debug(`MESSAGE REACTION ADD`);

    if (reaction.partial) reaction = await reaction.fetch();
    if (reaction.emoji.identifier !== '%E2%AD%90') return;
    logger.debug(`STARS: ${reaction.count} | USER: ${user}`);
  }
}

export default MessageBlockedListener;
