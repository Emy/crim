const { Command, version: klasaVersion, Duration } = require('klasa');
const { version: discordVersion, MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
			description: language => language.get('COMMAND_STATS_DESCRIPTION')
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
		
		let language = message.language;
		let embed = new MessageEmbed()
        .setTitle(`📊 ${language.get('FIELD_STATISTICS')}`)
        .addField(`💾 ${language.get('FIELD_MEMORY')}`, `${(memory || process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, true)
        .addField(`🕐 ${language.get('FIELD_UPTIME')}`, Duration.toNow(Date.now() - (process.uptime() * 1000)), true)
        .addField(`👥 ${language.get('FIELD_USERS')}`, (users || this.client.users.size).toLocaleString(), true)
        .addField(`🖥 ${language.get('FIELD_GUILDS')}`, (guilds || this.client.guilds.size).toLocaleString(), true)
        // Not really necessary for the end user.
        // .addField(message.language.get('FIELD_KLASA_VERSION'), klasaVersion, true)
        // .addField(message.language.get('FIELD_DISCORDJS_VERSION'), `v${discordVersion}`, true)
		// .addField(message.language.get('FIELD_NODEJS_VERSION'), `v${process.version}`, true)
		.addField(`👤 ${language.get('FIELD_DEVELOPER')}`, 'Emy#0001', true)
		.addField(`📁 ${language.get('FIELD_SOURCECODE')}`, `[${language.get('FIELD_CLICK_HERE')}](https://github.com/Emy/emybot)`, true)
		.setTimestamp()
		.setFooter(`Requested by ${message.author.tag}`)

        return message.send(embed);
	}

};
