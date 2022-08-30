import { CacheType, CommandInteraction } from 'discord.js';
import { Command } from '../../framework/command/command';

export default class PingCommand extends Command {
  constructor() {
    super('ping', {
      description: 'Ping command.',
    });
  }

  public execute(interaction: CommandInteraction<CacheType>): Promise<void> {
    return interaction.reply('Pong.');
  }
}
