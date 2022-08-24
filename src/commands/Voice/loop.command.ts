import { CacheType, CommandInteraction } from 'discord.js';
import { MusicUtils } from '../../music/music.util';
import { MessageEmbedCommand } from './messageembed';
import { Status } from './status';

export default class LoopCommand extends MessageEmbedCommand {
  constructor() {
    super('loop', 'Loop the currently playing track.', ['l']);
  }

  getStatus(interaction: CommandInteraction<CacheType>): Status {
    return MusicUtils.loop(interaction);
  }

  getTitle(): string {
    return '🎵 Loop';
  }
}
