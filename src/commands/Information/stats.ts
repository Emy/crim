import { EmbedFieldData, Message } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { Command } from 'discord-akairo';

class StatsCommand extends Command {
  constructor() {
    super('stats', {
      aliases: ['stats'],
      description: 'Show bot stats.',
    });
  }

  async exec(message: Message) {
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
        value: String(this.client.users.cache.size),
        inline: true,
      },
      {
        name: 'Servers',
        value: String(this.client.guilds.cache.size),
        inline: true,
      },
      {
        name: 'Developer',
        value:
          String(this.client.users.cache.get('127938763535024128') ?? (await this.client.users.fetch('127938763535024128'))),
        inline: true,
      },
      {
        name: 'Source code',
        value: `[Click here](https://github.com/Emy/crim)`,
        inline: true,
      },
      {
        name: 'Shard',
        value: `${this.client.shard.id + 1} / ${this.client.shard.shards.length}`,
        inline: true,
      },
    ]
    const embed = new MessageEmbed()
      .setTitle('Stats')
      .setColor('#b39eb5')
      .addFields(newFields)
      .setThumbnail(this.client.user.avatarURL({ format: 'png' }))
      .setFooter({text: `Requested by: ${message.author.tag}`,iconURL: message.author.avatarURL({ format: 'jpg' })});
    return message.channel.send({embeds: [embed]});;
  }
}

export default StatsCommand;
