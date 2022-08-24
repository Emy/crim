import { CommandInteraction, CacheType } from "discord.js";
import { MusicUtils } from "../../music/music.util";
import { MessageEmbedCommand } from "./messageembed";
import { status } from "./status";

export default class StopCommand extends MessageEmbedCommand {
  
  constructor() {
    super('stop','Stop the music.');
  }

  getStatus(interaction: CommandInteraction<CacheType>): status {
    return MusicUtils.stop(interaction);
  }

  getTitle(): string {
    return "Stop";
  }
}