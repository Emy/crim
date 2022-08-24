import { CacheType, CommandInteraction, MessageEmbed } from 'discord.js';
import { Command } from '../../framework/command/command';
import { MusicUtils } from '../../music/music.util';
import { status } from './status';

export default class VolumeCommand extends Command {
  constructor() {
    super('volume', {
      description: 'Change the volume of the music playing in vc.',
      usage: [{ optionName: 'Number', description: 'Volume between 1 and 100', required: true, name: 'volume' }],
    });
  }

  public execute(interaction: CommandInteraction<CacheType>): Promise<void> {
    const status: status = MusicUtils.volume(interaction);
    const title: string = '🎵 Volume';
    if (status.error) return interaction.reply(status.message);
    const embed = new MessageEmbed().setTitle(title).setColor('#ffd1dc').setDescription(status.message);
    return interaction.reply({ embeds: [embed] });
  }
}
