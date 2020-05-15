import { Command, CommandStore, KlasaMessage } from 'klasa';
import FiloClient from './../../../lib/client';
import Dispatcher from './../../../lib/dispatcher';

export default class extends Command {
  client: FiloClient;
  constructor(client: FiloClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      enabled: true,
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (lang) => lang.get('SKIP_DESCRIPTION'),
    });
  }

  async run(msg: KlasaMessage) {
    const dispatcher = this.client.queue.get(msg.guild.id) as Dispatcher;
    if (!dispatcher) return msg.send('No music playing in here.');
    if (msg.member.voice.channel.id != dispatcher.player.voiceConnection.voiceChannelID) {
      return msg.send('We need to be in the same voice channel.');
    }
    dispatcher.loop = false;
    if (dispatcher.player.stopTrack()) return msg.send('Skipped the track.');
    return msg.send('I could not skip the track');
  }
}
