import { Message, GuildMember, MessageEmbed } from 'discord.js';
import NekoClient from 'nekos.life';
import { Command } from 'discord-akairo';

const nekos = new NekoClient();

class KissCommand extends Command {
  constructor() {
    super('kiss', {
      aliases: ['kiss'],
      channel: 'guild',
      description: 'Kiss someone.',
      args: [
        {
          id: 'target',
          type: 'member',
          default: undefined,
        },
      ],
    });
  }

  async exec(message: Message, args: any) {
    const target = args.target as GuildMember;
    const embed = new MessageEmbed()
      .setDescription(`**${message.member.displayName}** is kissing **${target?.displayName ?? 'themselves'}**`)
      .setColor('#77dd77')
      .setImage((await nekos.sfw.kiss()).url)
      .setFooter(
        `Requested by: ${message.author.tag} | Provided by: nekos.life`,
        message.author.avatarURL({ format: 'jpg' }),
      );

    return message.channel.send(embed);
  }
}

export default KissCommand;
