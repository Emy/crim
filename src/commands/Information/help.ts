import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import CrimClient from '../../lib/CrimClient';
import { MessageEmbed } from 'discord.js';

class HelpCommand extends Command {
  client: CrimClient;
  constructor() {
    super('help', {
      aliases: ['help'],
      description: 'Get this help window.',
    });
  }

  async exec(message: Message) {
    const embed = new MessageEmbed()
      .setTitle('Command list')
      .setColor('blue')
      .setDescription(
        `For additional help please use \`${(await this.client.settings.get(message.guild.id)).prefix}help <command>\``,
      );

    this.client.commandHandler.categories.map((category) => {
      embed.addField(category.id, `\`${category.map((command) => command.id).join('` `')}\``);
    });

    message.channel.send(embed);
  }
}

export default HelpCommand;
