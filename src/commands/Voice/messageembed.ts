import { CommandInteraction, CacheType, MessageEmbed } from 'discord.js';
import { Command } from '../../framework/command/command';
import { status } from './status';

export abstract class MessageEmbedCommand extends Command {
  constructor(id: string, description: string, aliases?: string[]) {
    super(id, {
      description: description,
      aliases
    });
  }

  public execute(interaction: CommandInteraction<CacheType>): Promise<void> {
    const status: status = this.getStatus(interaction);
    const title: string = this.getTitle();
    if (status.error) return interaction.reply(status.message);
    const embed = new MessageEmbed().setTitle(title).setColor('#ffd1dc').setDescription(status.message);
    return interaction.reply({ embeds: [embed] });
  }

  abstract getStatus(interaction: CommandInteraction<CacheType>): status;
  abstract getTitle(): string;
}
