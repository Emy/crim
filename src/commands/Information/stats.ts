import { Message } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import CrimCommand from '../../lib/CrimCommand';

class StatsCommand extends CrimCommand {
  constructor() {
    super('stats', {
      aliases: ['stats'],
      category: 'Information'
    });
    this.helpText = 'Show bot stats.';
  }

  exec(message: Message) {
    const embed = new MessageEmbed()
      .setTitle('Stats')
      .setColor('GREEN')
      .addFields([
        {
          name: 'Memory',
          value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
          inline: true,
        },
        {
          name: 'Uptime',
          value: `...`,
          inline: true,
        },
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
          value: 'Emy#0001',
          inline: true,
        },
        {
          name: 'Source code',
          value: `[Click here](https://github.com/Emy/filo)`,
          inline: true,
        },
      ])
      .setFooter(`Requested by: ${message.author.tag}`, message.author.avatarURL({ format: 'jpg' }));
    return message.channel.send(embed);
  }
}

module.exports = StatsCommand;
