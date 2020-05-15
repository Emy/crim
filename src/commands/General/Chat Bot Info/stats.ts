import { MessageEmbed } from 'discord.js';
import { Command, CommandStore, Duration, KlasaClient, KlasaMessage } from 'klasa';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      guarded: true,
      description: (language) => language.get('COMMAND_STATS_DESCRIPTION'),
    });
  }

  async run(msg: KlasaMessage) {
    let [users, guilds, memory] = [0, 0, 0];

    if (this.client.shard) {
      const results = await this.client.shard.broadcastEval(`
      [
        this.users.size,
        this.guilds.size,
        (process.memoryUsage().heapUsed / 1024 / 1024)
      ]`);
      for (const result of results) {
        users += result[0];
        guilds += result[1];
        memory += result[2];
      }
    }

    const language = msg.language;
    const embed = new MessageEmbed()
      .setTitle(`${language.get('STATISTICS')}`)
      .addField(
        `${language.get('MEMORY')}`,
        `${(memory || process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`,
        true,
      )
      .addField(`${language.get('UPTIME')}`, Duration.toNow(Date.now() - process.uptime() * 1000), true)
      .addField(`${language.get('USERS')}`, (users || this.client.users.cache.size).toLocaleString(), true)
      .addField(`${language.get('GUILDS')}`, (guilds || this.client.guilds.cache.size).toLocaleString(), true)
      .addField(`${language.get('DEVELOPER')}`, 'Emy#0001', true)
      .addField(`${language.get('SOURCECODE')}`, `[${language.get('CLICK_HERE')}](https://github.com/Emy/filo)`, true);
    return msg.send(embed);
  }
}
