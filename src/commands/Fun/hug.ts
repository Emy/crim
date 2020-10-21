import { Message } from 'discord.js';
import { GuildMember, MessageEmbed } from 'discord.js';
import NekoClient from 'nekos.life';
import { Command } from 'discord-akairo';

const nekos = new NekoClient();

class HugCommand extends Command {
  constructor() {
    super('hug', {
      aliases: ['hug'],
      channel: 'guild',
      description: 'Hug someone.',
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
      .setDescription(`**${message.member.displayName}** is hugging **${target?.displayName ?? 'themselves'}**`)
      .setColor('#77dd77')
      .setImage((await nekos.sfw.hug()).url)
      .setFooter(
        `Requested by: ${message.author.tag} | Provided by: nekos.life`,
        message.author.avatarURL({ format: 'jpg' }),
      );

    return message.channel.send(embed);
  }
}

export default HugCommand;
