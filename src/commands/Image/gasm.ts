import { Message } from 'discord.js';
import NekoClient from 'nekos.life';
import { MessageEmbed } from 'discord.js';
import { TextChannel } from 'discord.js';
import CrimCommand from '../../lib/CrimCommand';
const nekos = new NekoClient();

class GasmCommand extends CrimCommand {
  constructor() {
    super('gasm', {
      aliases: ['gasm'],
      channel: 'guild',
      category: 'Image',
      userPermissions(message: Message) {
        if (!(message.channel as TextChannel).nsfw) return message.channel.send('This is a NFSW channel only command!');
      },
    });
    this.helpText = 'Get a random gasm picture/gif. (NSFW Only)';
  }

  async exec(message: Message) {
    const embed = new MessageEmbed()
      .setImage((await nekos.nsfw.gasm()).url)
      .setFooter(
        `Requested by: ${message.author.tag} | Provided by: nekos.life`,
        message.author.avatarURL({ format: 'jpg' }),
      );

    return message.channel.send(embed);
  }
}

module.exports = GasmCommand;