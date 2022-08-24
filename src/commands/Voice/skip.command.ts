import { CommandInteraction, CacheType } from "discord.js";
import { MusicUtils } from "../../music/music.util";
import { MessageEmbedCommand } from "./messageembed";
import { status } from "./status";

export default class SkipCommand extends MessageEmbedCommand {
  
  constructor() {
    super('skip', 
      'Skip a track.',
    );
  }

  getStatus(interaction: CommandInteraction<CacheType>): status {
    return MusicUtils.skip(interaction);
  }

  getTitle(): string {
    return "Skip"
  }
}