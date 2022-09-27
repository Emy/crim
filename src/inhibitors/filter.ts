import { Inhibitor } from 'discord-akairo';
import { Message } from 'discord.js';
import CrimClient from '../lib/CrimClient';
import { Logger } from 'tslog';
import { LoggerUtil } from '../logger.util';

const logger: Logger = LoggerUtil.getInstance().createChildLogger();

class FilterInhibitor extends Inhibitor {
  declare client: CrimClient;
  constructor() {
    super('filter', {
      reason: 'filter',
      type: 'pre',
    });
  }

  async exec(msg: Message) {
    logger.debug('WORD-FILTER IHIBITOR INVOKED');
    if (!(msg.guild || msg.guild?.available)) return false;
    const guildSettings = await this.client.settings.get(msg.guild.id);
    if (!guildSettings.enableWordFilter) return false;
    const filteredWords = guildSettings.filterWords;
    const result = filteredWords.some((word) => msg.content.toLowerCase().includes(word.toLowerCase()));
    if (!result) return result;
    logger.debug('WORD-FILTER INHIBITOR DETECTED A FILTERED WORD');
    await msg.delete();
    return result;
  }
}

export default FilterInhibitor;
