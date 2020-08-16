import { Message } from 'discord.js';
import CrimCommand from '../../lib/CrimCommand';

class HelpCommand extends CrimCommand {
  constructor() {
    super('help', {
      aliases: ['help'],
      category: 'Information',
    });
    this.helpText = 'Get this help window.';
  }

  exec(message: Message) {
    const messages = [];
    this.client.commandHandler.categories.map((category) => messages.push(`**${category.id} Category** \`\`\`asciidoc
${(category.map((command) => `${this.client.commandHandler.prefix}${command.id} :: ${(command as CrimCommand).helpText}
`)).join('')}
\`\`\``))
    return message.author.send(messages, {split: true});
  }
}

module.exports = HelpCommand;
