import { Message } from 'discord.js';
import { GuildMember } from 'discord.js';
import NekoClient from 'nekos.life';
import { MessageEmbed } from 'discord.js';
import CrimCommand from '../../lib/CrimCommand';
const nekos = new NekoClient();

class HugCommand extends CrimCommand {
  constructor() {
    super('hug', {
      aliases: ['hug'],
      channel: 'guild',
      category: 'Fun',
      helpText: 'HELPUUUU',
      args: [
        {
          id: 'target',
          type: 'member',
          default: undefined,
        },
      ],
    });
    this.helpText = 'Hug someone.'
  }

  async exec(message: Message, args: any) {
    const target = args.target as GuildMember;
    const embed = new MessageEmbed()
      .setDescription(`**${message.member.displayName}** is hugging **${target?.displayName ?? 'themselves'}**`)
      .setImage((await nekos.sfw.hug()).url)
      .setFooter(
        `Requested by: ${message.author.tag} | Provided by: nekos.life`,
        message.author.avatarURL({ format: 'jpg' }),
      );

    return message.channel.send(embed);
  }
}

module.exports = HugCommand;
