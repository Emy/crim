/* eslint-disable max-len */
const { Command, Duration } = require('klasa');
const emoji = require('../../../util/emoji');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      guarded: true,
      description: (language) => language.get('COMMAND_STATS_DESCRIPTION'),
    });
  }

  async run(message) {
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

    const language = message.language;
    const emojis = this.client.emojis.cache;
    message.genEmbed()
        .setTitle(`${emojis.get(emoji.graph)} ${language.get('STATISTICS')}`)
        .addField(`${emojis.get(emoji.memory)} ${language.get('MEMORY')}`, `${(memory || process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, true)
        .addField(`${emojis.get(emoji.time)} ${language.get('UPTIME')}`, Duration.toNow(Date.now() - (process.uptime() * 1000)), true)
        .addField(`${emojis.get(emoji.users)} ${language.get('USERS')}`, (users || this.client.users.cache.size).toLocaleString(), true)
        .addField(`${emojis.get(emoji.server)} ${language.get('GUILDS')}`, (guilds || this.client.guilds.cache.size).toLocaleString(), true)
        .addField(`${emojis.get(emoji.dev)} ${language.get('DEVELOPER')}`, 'Emy#0001', true)
        .addField(`${emojis.get(emoji.github)} ${language.get('SOURCECODE')}`, `[${language.get('CLICK_HERE')}](https://github.com/Emy/filo)`, true)
        .send();
  }
};
