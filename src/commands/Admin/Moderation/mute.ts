import { GuildMember } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage, Timestamp } from 'klasa';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      enabled: false,
      runIn: ['text'],
      requiredPermissions: [],
      requiredSettings: [],
      guarded: true,
      permissionLevel: 6,
      description: '',
      usage: '<mem:member> [dur:time] [reason:...string]',
    });
  }

  async run(msg: KlasaMessage, []: [GuildMember, Timestamp, string]) {
    return msg.send('');
  }
}
