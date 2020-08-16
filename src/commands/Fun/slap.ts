import { Message } from 'discord.js';
import { GuildMember } from 'discord.js';
import NekoClient from 'nekos.life';
import { MessageEmbed } from 'discord.js';
import CrimCommand from '../../lib/CrimCommand';
const nekos = new NekoClient();

class SlapCommand extends CrimCommand {
  constructor() {
    super('slap', {
      aliases: ['slap'],
      channel: 'guild',
      category: 'Fun',
      args: [
        {
          id: 'target',
          type: 'member',
          default: undefined,
        },
      ],
    });
    this.helpText = 'Slap someone.';
  }

  async exec(message: Message, args: any) {
    const target = args.target as GuildMember;
    const embed = new MessageEmbed()
      .setDescription(`**${message.member.displayName}** is slapping **${target?.displayName ?? 'themselves'}**`)
      .setImage((await nekos.sfw.slap()).url)
      .setFooter(
        `Requested by: ${message.author.tag} | Provided by: nekos.life`,
        message.author.avatarURL({ format: 'jpg' }),
      );

    return message.channel.send(embed);
  }
}

module.exports = SlapCommand;
