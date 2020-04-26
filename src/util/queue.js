import Dispatcher from './dispatcher';

class Queue extends Map {
  constructor(client) {
    super();
    this.client = client;
  }

  async handleTrack(node, track, msg) {
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

export default Queue;
