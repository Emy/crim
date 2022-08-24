import { CommandInteraction, CacheType } from 'discord.js';
import { MusicUtils } from '../../music/music.util';
import { MessageEmbedCommand } from './messageembed';
import { Status } from './status';

export default class QueueCommand extends MessageEmbedCommand {
  constructor() {
    super('queue', 'Show the music queue.');
  }

  getStatus(interaction: CommandInteraction<CacheType>): Status {
    return MusicUtils.queue(interaction);
  }

  getTitle(): string {
    return 'Queue';
  }
}
