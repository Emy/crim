import { CacheType, CommandInteraction } from 'discord.js';
import { Command } from '../../framework/command/command';

export default class EmojiCommand extends Command {
  constructor() {
    super('emoji', {
      description: 'Not Supported hat the moment.',
      usage: [{ optionName: 'String', description: 'the emoji to show', required: true, name: 'emoji' }],
    });
  }

  public execute(interaction: CommandInteraction<CacheType>): Promise<void> {
   return interaction.reply("Not Supported hat the moment");
  }

}
