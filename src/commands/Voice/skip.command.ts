import { CommandInteraction, CacheType } from 'discord.js';
import { MusicUtils } from '../../music/music.util';
import { MessageEmbedCommand } from './messageembed';
import { Status } from './status';

export default class SkipCommand extends MessageEmbedCommand {
  constructor() {
    super('skip', 'Skip a track.');
  }

  getStatus(interaction: CommandInteraction<CacheType>): Status {
    return MusicUtils.skip(interaction);
  }

  getTitle(): string {
    return 'Skip';
  }
}
