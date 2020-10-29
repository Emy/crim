import { Listener } from 'discord-akairo';
import { getLogger } from '@log4js2/core';
import { MessageReaction } from 'discord.js';
import { User } from 'discord.js';

const logger = getLogger('Crim');

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
    logger.debug(`STARS: ${reaction.count}`);
  }
}

export default MessageBlockedListener;
