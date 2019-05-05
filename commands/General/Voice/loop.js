const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ['text'],
            requiredPermissions: [],
            aliases: ['l'],
            cooldown: 5,
            description: language => language.get('COMMAND_LOOP_DESCRIPTION'),
        });
    }

    async run (message, [...paran]) {
        if(this.client.music.get(message.guild.id) == undefined) return message.sendLocale('ERROR_LAVALINK_NO_MUSIC_RUNNING');
        if(!message.member.voice.channel || (this.client.music.get(message.guild.id).channel !== message.member.voice.channel.id)) throw 'You need to be in the Voice channel where the bot is in.';
        const player = this.client.music.get(message.guild.id);
        player.loop = !player.loop;
        message.send(`Loop: ${player.loop}`);
    }
};