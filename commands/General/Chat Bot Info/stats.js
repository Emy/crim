/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const { Command, version: klasaVersion, Duration } = require('klasa');
const { version: discordVersion, MessageEmbed } = require('discord.js');
const emoji = require('../../../util/emoji');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      guarded: true,
      description: (language) => language.get('COMMAND_STATS_DESCRIPTION'),
    });
  }

  async run(message) {
    let [users, guilds, channels, memory] = [0, 0, 0, 0];

    if (this.client.shard) {
      const results = await this.client.shard.broadcastEval(`[this.users.size, this.guilds.size, this.channels.size, (process.memoryUsage().heapUsed / 1024 / 1024)]`);
      for (const result of results) {
        users += result[0];
        guilds += result[1];
        channels += result[2];
        memory += result[3];
      }
    }

    const language = message.language;
    const emojis = this.client.emojis;
    message.genEmbed()
        .setTitle(`${emojis.get(emoji.graph)} ${language.get('STATISTICS')}`)
        .addField(`${emojis.get(emoji.memory)} ${language.get('MEMORY')}`, `${(memory || process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, true)
        .addField(`${emojis.get(emoji.time)} ${language.get('UPTIME')}`, Duration.toNow(Date.now() - (process.uptime() * 1000)), true)
        .addField(`${emojis.get(emoji.users)} ${language.get('USERS')}`, (users || this.client.users.size).toLocaleString(), true)
        .addField(`${emojis.get(emoji.server)} ${language.get('GUILDS')}`, (guilds || this.client.guilds.size).toLocaleString(), true)
        // Not really necessary for the end user.
        // .addField(message.language.get('FIELD_KLASA_VERSION'), klasaVersion, true)
        // .addField(message.language.get('FIELD_DISCORDJS_VERSION'), `v${discordVersion}`, true)
        // .addField(message.language.get('FIELD_NODEJS_VERSION'), `v${process.version}`, true)
        .addField(`${emojis.get(emoji.dev)} ${language.get('DEVELOPER')}`, 'Emy#0001', true)
        .addField(`${emojis.get(emoji.github)} ${language.get('SOURCECODE')}`, `[${language.get('CLICK_HERE')}](https://github.com/Emy/filo)`, true)
        .send();
  }
};
