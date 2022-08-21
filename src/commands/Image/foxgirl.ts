import { Message } from 'discord.js';
import NekoClient from 'nekos.life';
import { MessageEmbed } from 'discord.js';
import { Command } from 'discord-akairo';

const nekos = new NekoClient();

class FoxgirlCommand extends Command {
  constructor() {
    super('foxgirl', {
      aliases: ['foxgirl'],
      channel: 'guild',
      description: 'Get a random foxgirl.',
    });
  }

  async exec(message: Message) {
    const embed = new MessageEmbed()
      .setImage((await nekos.sfw.foxGirl()).url)
      .setColor('#77dd77')
      .setFooter(
        {
          text: `Requested by: ${message.author.tag} | Provided by: nekos.life`,
          iconURL: message.author.avatarURL({ format: 'jpg' }),
        }
      );

    return message.channel.send({embeds: [embed]});;
  }
}

export default FoxgirlCommand;
