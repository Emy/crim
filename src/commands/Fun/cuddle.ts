import NekoClient from 'nekos.life';
import { Command } from 'discord-akairo';
import { Message, GuildMember, MessageEmbed } from 'discord.js';

const nekos = new NekoClient();

class CuddleCommand extends Command {
  constructor() {
    super('cuddle', {
      aliases: ['cuddle'],
      channel: 'guild',
      description: [
        'Cuddle someone.',
        'Usage: `cuddle <@mention | nothing>`',
        "(If someone is mentioned you cuddle them. If there's no mention you cuddle yourself.)",
      ],
      args: [
        {
          id: 'target',
          type: 'member',
          default: undefined,
        },
      ],
    });
  }

  async exec(message: Message, args: CuddleCommandArguments) {
    const target = args.target as GuildMember;
    const embed = new MessageEmbed()
      .setDescription(`**${message.member.displayName}** is cuddling **${target?.displayName ?? 'themselves'}**`)
      .setColor('#77dd77')
      .setImage((await nekos.sfw.cuddle()).url)
      .setFooter(
        `Requested by: ${message.author.tag} | Provided by: nekos.life`,
        message.author.avatarURL({ format: 'jpg' }),
      );

    return message.channel.send(embed);
  }
}

type CuddleCommandArguments = {
  target: GuildMember;
};

export default CuddleCommand;
