import { GuildMember } from 'discord.js';
import { Event, EventStore } from 'klasa';
import FiloClient from '../lib/client';
import Dispatcher from '../lib/dispatcher';

export default class extends Event {
  client: FiloClient;
  constructor(client: FiloClient, store: EventStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      enabled: true,
      once: false,
    });
  }

  async run(oldMember: GuildMember, newMember: GuildMember) {
    if (!(oldMember && newMember)) return;
    const dispatcher = this.client.queue.get(oldMember.guild.id) as Dispatcher;
    if (!dispatcher) return;
    const voiceChannel = oldMember.guild.channels.cache.get(dispatcher.player.voiceConnection.voiceChannelID);
    if (voiceChannel.members.size === 1) dispatcher.onEvent(undefined);
  }
}
