const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ['text'],
            requiredPermissions: ['EMBED_LINKS'],
            aliases: ['leave'],
            cooldown: 5,
            description: language => language.get('COMMAND_STOP_DESCRIPTION'),
        });
    }

    async run (message, [...paran]) {
        if(this.client.music.get(message.guild.id) == undefined) return message.sendLocale('ERROR_LAVALINK_NO_MUSIC_RUNNING');
        if(!message.member.voice.channel || (this.client.music.get(message.guild.id).channel !== message.member.voice.channel.id)) throw 'You need to be in the Voice channel where the bot is in.';

        let embed = new MessageEmbed()
        .setColor('#dd67ff')
        .setTimestamp()
        .setFooter(`Requested by: ${message.author.tag}`)
        ;

        if (this.client.music.get(message.guild.id).paused) {
            clearTimeout(this.client.music.get(`${message.guild.id}_pause_timer`));
            this.client.music.delete(`${message.guild.id}_pause_timer`);

            this.client.music.get(message.guild.id).stop();
            embed.setTitle(':stop_button: Stopped Playback');

        } else {
            this.client.music.get(message.guild.id).stop();
            embed.setTitle(':stop_button: Stopped Playback');
        }

        this.client.music.get('pm').leave(message.guild.id);
        this.client.music.delete(message.guild.id);

        message.send(embed);
    }
};