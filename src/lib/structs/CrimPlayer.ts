import { LavalinkNode, Player } from '@lavacord/discord.js';
import { Message } from 'discord.js';
import CrimTrack from './CrimTrack';

export default class CrimPlayer extends Player {
  queue: CrimTrack[];
  nowPlaying: CrimTrack;
  loop: boolean;
  guildID: string;

  constructor(node: LavalinkNode, id: string) {
    super(node, id);
    this.queue = [];
    this.loop = false;

    this.once('error', (error) => console.error(error));
    this.on('end', async (data) => {
      if (data.reason === 'REPLACED') return;
      if (this.queue.length !== 0 || this.loop) return this.nextTrack();
      await this.manager.leave(this.guildID);
    });
  }

  addTrack(message: Message, llTrack: any): CrimTrack {
    const track = new CrimTrack({
      title: llTrack.info.title,
      track: llTrack.track,
      uri: llTrack.info.uri,
      length: llTrack.info.length,
      position: llTrack.info.position,
      isSeekable: llTrack.info.isSeekable,
      ytIdentifier: llTrack.info.identifier,
      uploader: llTrack.info.author,
      requestedBy: message.author.id,
    });
    this.queue.push(track);
    return track;
  }

  nextTrack() {
    if (!this.loop) this.nowPlaying = this.queue.shift();
    this.play(this.nowPlaying.track);
  }
}
