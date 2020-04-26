import { GuildMember } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      enabled: false,
      runIn: ['text'],
      requiredPermissions: ['KICK_MEMBERS'],
      cooldown: 0,
      guarded: true,
      permissionLevel: 6,
      description: (language) => language.get('KICK_DESCRIPTION'),
      usage: '<user:member> [reason:string]',
    });
  }

  async run(msg: KlasaMessage, [user, reason]: [GuildMember, string | undefined]) {
    const sender = msg.member;
    const bot = await msg.guild.members.fetch(this.client.user.id);
    const target = await msg.guild.members.fetch(user.id);
    if (target.id === bot.id) return msg.send('I can not kick myself!');
    if (target.id === sender.id) return msg.send('You can not kick yourself!');
    if (target.roles.highest >= sender.roles.highest)
      return msg.send('The target has a higher or the same role as you. Aborting the kick...');
    if (target.bannable) await target.kick(reason);
    return msg.send(`**${target.user.tag}** is now kicked.`);
  }
}
