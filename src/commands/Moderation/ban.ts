import { Message, GuildMember, Permissions } from 'discord.js';
import { Command } from 'discord-akairo';

class BanCommand extends Command {
  constructor() {
    super('ban', {
      aliases: ['ban'],
      channel: 'guild',
      description: 'Ban a user.',
      userPermissions: [Permissions.FLAGS.BAN_MEMBERS],
      clientPermissions: [Permissions.FLAGS.BAN_MEMBERS, Permissions.FLAGS.EMBED_LINKS],
      args: [
        {
          id: 'target',
          type: 'member',
          default: undefined,
        },
        {
          id: 'reason',
          type: 'string',
          default: 'No reason provided.',
        },
      ],
    });
  }

  exec(message: Message, args: BanArguments) {
    const target = args.target;
    const reason = args.reason;

    if (!target) return message.channel.send('You did not provide a valid user to ban.');
    if (target.id === this.client.user.id) return message.channel.send('I cannot ban myself.');
    if (target.id === message.author.id) return message.channel.send('You cannot ban yourself.');
    if (target.roles.highest >= message.member.roles.highest)
      return message.channel.send('You have to have a higher rank than the person you wanna ban.');
    if (!target.bannable) return message.channel.send('I cannot ban this person.');
    // target.ban({ reason: reason });
    return message.reply(`**${target.user.tag}** has been banned. Reason: **${reason}**`);
  }
}

type BanArguments = {
  target: GuildMember | undefined;
  reason: string | undefined;
};

export default BanCommand;
