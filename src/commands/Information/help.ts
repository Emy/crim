import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import CrimClient from '../../lib/CrimClient';
import { MessageEmbed } from 'discord.js';

class HelpCommand extends Command {
  declare client: CrimClient;
  constructor() {
    super('help', {
      aliases: ['help'],
      description: 'Get a help window for a certain command or a command list.',
      args: [
        {
          id: 'command',
          type: 'string',
          match: 'text',
          default: '',
        },
      ],
    });
  }

  async exec(message: Message, args: HelpCommandArguments) {
    const command = this.client.commandHandler.findCommand(args.command);
    if (!command) return await this.printAllHelp(message);
    return this.printCommandHelp(message, command);
  }

  async printAllHelp(message: Message) {
    const embed = new MessageEmbed()
      .setTitle('Command list')
      .setColor('#aec6cf')
      .setDescription(
        `For additional help please use \`${(await this.client.settings.get(message.guild.id)).prefix}help <command>\``,
      );
    this.client.commandHandler.categories.map((category) => {
      embed.addFields([
        {
          name: category.id,
          value: `\`${category.map((command) => command.id).join('` `')}\``
        }
      ]);
    });
    return message.channel.send({embeds: [embed]});;
  }

  printCommandHelp(message: Message, command: Command) {
    console.log(command.argumentDefaults);
    const embed = new MessageEmbed()
      .setAuthor({name: `Command help - ${command.id}`, iconURL:  this.client.user.avatarURL({ format: 'jpg' })})
      .setColor('#aec6cf')
      .setDescription(command.description)
      .addFields([
        {
          name: 'Aliases',
          value: command.aliases.join(', ')
        }
      ]);
    return message.channel.send({embeds: [embed]});;
  }
}

type HelpCommandArguments = {
  command: string;
};

export default HelpCommand;
