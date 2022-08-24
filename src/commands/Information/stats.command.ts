import { CacheType, CommandInteraction, EmbedFieldData } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { Command } from '../../framework/command/command';

class StatsCommand extends Command {
  constructor() {
    super('stats', {
      aliases: ['stats'],
      description: 'Show bot stats.',
    });
  }

  public async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
    const newFields: EmbedFieldData[] = [
      {
        name: 'Memory',
        value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
        inline: true,
      },
      // {
      //   name: 'Uptime',
      //   value: `...`,
      //   inline: true,
      // },
      {
        name: 'Users',
        value: String(interaction.client.users.cache.size),
        inline: true,
      },
      {
        name: 'Servers',
        value: String(interaction.client.guilds.cache.size),
        inline: true,
      },
      {
        name: 'Developer',
        value:
          String(interaction.client.users.cache.get('127938763535024128') ?? (await interaction.client.users.fetch('127938763535024128'))),
        inline: true,
      },
      {
        name: 'Source code',
        value: `[Click here](https://github.com/Emy/crim)`,
        inline: true,
      },
    ]
    if(interaction.client.shard){
      newFields.push(
        {
          name: 'Shard',
          value: `${interaction.client.shard.ids[0] + 1} / ${interaction.client.shard.count}`,
          inline: true,
        }
      )
    }
    const embed = new MessageEmbed()
      .setTitle('Stats')
      .setColor('#b39eb5')
      .addFields(newFields)
      .setThumbnail(interaction.client.user.avatarURL({ format: 'png' }))
      .setFooter({text: `Requested by: ${interaction.user.tag}`,iconURL: interaction.user.avatarURL({ format: 'jpg' })});
    return interaction.reply({embeds: [embed]});;
  }
}

export default StatsCommand;
