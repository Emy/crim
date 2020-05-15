import { Client, KlasaMessage } from 'klasa';
import { ShoukakuSocket, Track } from 'shoukaku';
import Dispatcher from './dispatcher';

export default class Queue extends Map {
  public client: Client;

  constructor(client: Client) {
    super();
    this.client = client;
  }

  async handleTrack(node: ShoukakuSocket, track: Track, msg: KlasaMessage): Promise<Dispatcher | null> {
    if (!track) return;
    let dispatcher = this.get(msg.guild.id);
    if (!dispatcher) {
      const player = await node.joinVoiceChannel({
        guildID: msg.guild.id,
        voiceChannelID: msg.member.voice.channelID,
      });
      dispatcher = new Dispatcher({
        client: this.client,
        guild: msg.guild,
        textChannel: msg.channel,
        player: player,
      });
      dispatcher.queue.push(track);
      this.set(msg.guild.id, dispatcher);
      return dispatcher;
    }
    dispatcher.queue.push(track);
    return null;
  }
}
