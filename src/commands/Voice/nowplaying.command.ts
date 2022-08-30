import { CacheType, CommandInteraction, MessageEmbed } from 'discord.js';
import { Command } from '../../framework/command/command';
import { MusicUtils } from '../../music/music.util';

export default class NowPlayingCommand extends Command {
  constructor() {
    super('nowplaying', {
      aliases: ['np'],
      description: 'Show the surrently playing track.',
    });
  }

  public execute(interaction: CommandInteraction<CacheType>): Promise<void> {
    const message: { title: string; position: string; time: string } | string = MusicUtils.nowplaying(interaction);
    if (typeof message === 'string') return interaction.reply(message);
    const embed = new MessageEmbed()
      .setTitle('🎵 Now playing')
      .setColor('#ffd1dc')
      .setDescription(message.title)
      .addFields([
        {
          name: 'Position',
          value: message.position,
          inline: true,
        },
        {
          name: 'Time',
          value: message.time,
          inline: true,
        },
      ]);
    return interaction.reply({ embeds: [embed] });
  }
}
