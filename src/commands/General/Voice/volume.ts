import { Command, CommandStore, KlasaMessage } from 'klasa';
import FiloClient from './../../../lib/client';
import Dispatcher from './../../../lib/dispatcher';

export default class extends Command {
  client: FiloClient;
  constructor(client: FiloClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      enabled: true,
      runIn: ['text'],
      requiredPermissions: [],
      cooldown: 5,
      description: (lang) => lang.get('VOLUME_DESCRIPTION'),
      usage: '[volume:int]',
    });
  }

  async run(msg: KlasaMessage, [volume]: [number]) {
    const dispatcher = this.client.queue.get(msg.guild.id) as Dispatcher;
    if (!dispatcher) return msg.send('No music playing in here.');
    if (msg.member.voice.channel.id != dispatcher.player.voiceConnection.voiceChannelID) {
      return msg.send('We need to be in the same voice channel.');
    }
    if (volume > 200 || volume < 1) return msg.send('Volume restriction 1%-200%');
    dispatcher as Dispatcher;
    await dispatcher.player.setVolume(volume);
    return msg.send(`Set volume to ${volume}`);
  }
}
