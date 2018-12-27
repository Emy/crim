const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            runIn: ['text'],
            requiredPermissions: [],
            requiredSettings: [],
            aliases: ['np'],
            autoAliases: true,
            bucket: 1,
            cooldown: 0,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: 'Display the currently played track.',
            extendedHelp: 'No extended help available.',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [...params]) {
        if(this.client.music.get(message.guild.id) == undefined) throw "No music running!";
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

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
