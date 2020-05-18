import { Command, CommandStore, KlasaClient, KlasaMessage, KlasaUser } from 'klasa';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      enabled: true,
      runIn: ['text'],
      requiredPermissions: [],
      permissionLevel: 6,
      description: '',
      usage: '<user:user> [daysToPurge:int] [reason:...string]',
    });
  }

  async run(msg: KlasaMessage, [user, daysToPurge, reason]: [KlasaUser, number, string | undefined]) {
    const sender = msg.member;
    const bot = await msg.guild.members.fetch(this.client.user.id);
    const target = await msg.guild.members.fetch(user.id);
    if (target.id === bot.id) return msg.send('I can not ban myself!');
    if (target.id === sender.id) return msg.send('You can not ban yourself!');
    if (target.roles.highest >= sender.roles.highest)
      return msg.send('The target has a higher or the same role as you. Aborting the ban...');
    if (target.bannable)
      await target.ban({
        days: daysToPurge ?? 0,
        reason: reason,
      });
    return msg.send(`**${target.user.tag}** is now banned.`);
  }
}
