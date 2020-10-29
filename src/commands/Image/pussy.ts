import { Message } from 'discord.js';
import NekoClient from 'nekos.life';
import { MessageEmbed } from 'discord.js';
import { TextChannel } from 'discord.js';
import { Command } from 'discord-akairo';

const nekos = new NekoClient();

class PussyCommand extends Command {
  constructor() {
    super('pussy', {
      aliases: ['pussy'],
      channel: 'guild',
      description: 'Get a random boob picture/gif. (NSFW Only)',
      userPermissions(message: Message) {
        if (!(message.channel as TextChannel).nsfw) return message.channel.send('This is a NFSW channel only command!');
      },
    });
  }

  async exec(message: Message) {
    const embed = new MessageEmbed()
      .setImage((await nekos.nsfw.pussy()).url)
      .setColor('#77dd77')
      .setFooter(
        `Requested by: ${message.author.tag} | Provided by: nekos.life`,
        message.author.avatarURL({ format: 'jpg' }),
      );

    return message.channel.send(embed);
  }
}

export default PussyCommand;
