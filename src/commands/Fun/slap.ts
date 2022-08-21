import { Message } from 'discord.js';
import { GuildMember } from 'discord.js';
import NekoClient from 'nekos.life';
import { MessageEmbed } from 'discord.js';
import { Command } from 'discord-akairo';

const nekos = new NekoClient();

class SlapCommand extends Command {
  constructor() {
    super('slap', {
      aliases: ['slap'],
      channel: 'guild',
      description: [
        'Slap someone.',
        'Usage: `slap <@mention | nothing>`',
        "(If someone is mentioned you slap them. If there's no mention you slap yourself.)",
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

  async exec(message: Message, args: SlapCommandArguments) {
    const target = args.target as GuildMember;
    const embed = new MessageEmbed()
      .setDescription(`**${message.member.displayName}** is slapping **${target?.displayName ?? 'themselves'}**`)
      .setColor('#77dd77')
      .setImage((await nekos.sfw.slap()).url)
      .setFooter(
        `Requested by: ${message.author.tag} | Provided by: nekos.life`,
        message.author.avatarURL({ format: 'jpg' }),
      );

    return message.channel.send({embeds: [embed]});;
  }
}

type SlapCommandArguments = {
  target: GuildMember;
};

export default SlapCommand;
