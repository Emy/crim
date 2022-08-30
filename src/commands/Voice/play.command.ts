import { CacheType, CommandInteraction, MessageEmbed } from 'discord.js';
import { Status } from './status';
import { MusicUtils } from '../../music/music.util';
import { Command } from '../../framework/command/command';

export default class PlayCommand extends Command {
  constructor() {
    super('play', {
      description: 'Play a track.',
      usage: [{ optionName: 'String', description: 'Name of a track', required: true, name: 'title' }],
    });
  }

  public async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
    const status: Status = await MusicUtils.play(interaction);
    const description = '🎵 Play Track';
    if (status.error) return interaction.reply(status.message);
    const embed = new MessageEmbed().setTitle(description).setColor('#ffd1dc').setDescription(status.message);
    return interaction.reply({ embeds: [embed] });
  }
}
