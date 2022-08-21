import { Message } from 'discord.js';
import NekoClient from 'nekos.life';
import { MessageEmbed } from 'discord.js';
import { TextChannel } from 'discord.js';
import { Command } from 'discord-akairo';

const nekos = new NekoClient();

class NekoCommand extends Command {
  constructor() {
    super('neko', {
      aliases: ['neko'],
      channel: 'guild',
      description: 'Get a random neko picture/gif.',
    });
  }

  async exec(message: Message) {
    const embed = new MessageEmbed()
      .setImage(((message.channel as TextChannel).nsfw ? await nekos.nsfw.neko() : await nekos.sfw.neko()).url)
      .setColor('#77dd77')
      .setFooter(
        `Requested by: ${message.author.tag} | Provided by: nekos.life`,
        message.author.avatarURL({ format: 'jpg' }),
      );

    return message.channel.send({embeds: [embed]});;
  }
}

export default NekoCommand;
