import { CommandInteraction, CacheType } from "discord.js";
import { MusicUtils } from "../../music/music.util";
import { MessageEmbedCommand } from "./messageembed";
import { status } from "./status";

export default class QueueCommand extends MessageEmbedCommand {

  constructor() {
    super('queue',
      'Show the music queue.',
    );
  }

  getStatus(interaction: CommandInteraction<CacheType>): status {
    return MusicUtils.queue(interaction);
  }

  getTitle(): string {
    return "Queue";
  }

}
