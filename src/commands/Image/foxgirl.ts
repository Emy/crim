import { Message } from 'discord.js';
import NekoClient from 'nekos.life';
import { MessageEmbed } from 'discord.js';
import CrimCommand from '../../lib/CrimCommand';
const nekos = new NekoClient();

class FoxgirlCommand extends CrimCommand {
  constructor() {
    super('foxgirl', {
      aliases: ['foxgirl'],
      channel: 'guild',
      category: 'Image'
    });
    this.helpText = 'Get a random foxgirl.';
  }

  async exec(message: Message) {
    const embed = new MessageEmbed()
      .setImage((await nekos.sfw.foxGirl()).url)
      .setFooter(
        `Requested by: ${message.author.tag} | Provided by: nekos.life`,
        message.author.avatarURL({ format: 'jpg' }),
      );

    return message.channel.send(embed);
  }
}

module.exports = FoxgirlCommand;