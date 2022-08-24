import { CommandInteraction, CacheType } from 'discord.js';
import { MusicUtils } from '../../music/music.util';
import { MessageEmbedCommand } from './messageembed';
import { status } from './status';

export default class PauseCommand extends MessageEmbedCommand {
  constructor() {
    super('pause', 'Pause the music playing in vc.', ['p']);
  }

  getStatus(interaction: CommandInteraction<CacheType>): status {
    return MusicUtils.pause(interaction);
  }
  getTitle(): string {
    return '🎵 Pause';
  }
}
