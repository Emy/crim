const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ['text'],
            requiredPermissions: ['EMBED_LINKS'],
            aliases: ['np'],
            cooldown: 5,
            description: language => language.get('COMMAND_NOWPLAYING_DESCRIPTION'),
        });
    }

    async run(message, [...params]) {
        if(this.client.music.get(message.guild.id) == undefined) return message.sendLocale('ERROR_LAVALINK_NO_MUSIC_RUNNING');
        if(!message.member.voice.channel || (this.client.music.get(message.guild.id).channel !== message.member.voice.channel.id)) throw 'You need to be in the Voice channel where the bot is in.';
        const player = this.client.music.get(message.guild.id);
        this.sendNowPlayingEmbed(message, player.songs[0]);
    }

    sendNowPlayingEmbed(message, song) {
        console.log(song);
        let embed = new MessageEmbed()
        .setTitle(song.info.title)
        .setColor('#dd67ff')
        .addField('Length', `${moment(song.info.length).format('mm:ss')}min`, true)
        .setThumbnail(`https://img.youtube.com/vi/${song.info.identifier}/default.jpg`)
        .setURL(`https://youtu.be/${song.info.identifier}`)
        .setTimestamp()
        .setFooter(`Uploaded by: ${song.info.author}`)
        ;
        message.send(embed);
    }

};
