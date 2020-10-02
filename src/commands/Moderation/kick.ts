import { Message, GuildMember } from 'discord.js';
import { Command } from 'discord-akairo';

class KickCommand extends Command {
  constructor() {
    super('kick', {
      aliases: ['kick'],
      channel: 'guild',
      description: 'Kick a user.',
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

  exec(message: Message, args: any) {
    const target = args.target as GuildMember;
    const reason = args.reason as string;

    if (!target) return message.channel.send('You did not provide a valid user to kick.');
    if (target.id === this.client.user.id) return message.channel.send('I cannot kick myself.');
    if (target.id === message.author.id) return message.channel.send('You cannot kick yourself.');
    if (target.roles.highest >= message.member.roles.highest)
      return message.channel.send('You have to have a higher rank than the person you wanna kick.');
    if (!target.kickable) return message.channel.send('I cannot kick this person.');
    target.kick(reason);
    return message.reply(`**${target.user.tag}** has been kicked. Reason: **${reason}**`);
  }
}

export default KickCommand;
