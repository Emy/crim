import { Message } from 'discord.js';
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
    const embed = new MessageEmbed()
      .setTitle('Stats')
      .setColor('#b39eb5')
      .addFields([
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
          value: this.client.users.cache.size,
          inline: true,
        },
        {
          name: 'Servers',
          value: this.client.guilds.cache.size,
          inline: true,
        },
        {
          name: 'Developer',
          value:
            this.client.users.cache.get('127938763535024128') ?? (await this.client.users.fetch('127938763535024128')),
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
      ])
      .setThumbnail(this.client.user.avatarURL({ format: 'png' }))
      .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL({ format: 'jpg' }));
    return message.channel.send(embed);
  }
}

export default StatsCommand;
