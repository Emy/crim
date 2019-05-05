const { Command } = require('klasa');
const { MessageEmbed, Collection } = require('discord.js');
const { PlayerManager } = require("discord.js-lavalink");
const fetch = require('node-fetch');
const moment = require('moment');
let playerManager;
const { nodes } = require('../../../config');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ['text'],
            requiredPermissions: ['EMBED_LINKS'],
            aliases: ['p'],
            cooldown: 5,
            description: language => language.get('COMMAND_PLAY_DESCRIPTION'),
            usage: '<song:string>',
        });
    }

    async run (message, [song]) {
        if (!message.member.voice.channel) return message.sendLocale('ERROR_NOT_IN_VC');
        let data = await fetch(`http://${nodes[0].host}:${nodes[0].port}/loadtracks?identifier=ytsearch:${song}`, {
            headers: {
                authorization: nodes[0].password
            }});
        if (!data) return message.sendLocale('ERROR_LAVALINK_NO_DATA');
        let response = JSON.parse(await data.text());
        if (response.loadType == "NO_MATCHES") throw "No tracks found";
        let player;
        if(this.client.music.get(message.guild.id) === undefined) {
            player = await playerManager.join({
                guild: message.guild.id,
                channel: message.member.voice.channel.id,
                host: nodes[0].host
            });
            player.songs = [];
            player.loop = false;
            player.songs.push(response.tracks[0]);
            player.on("end", data => {
                if (!player.loop) player.songs.shift();
                if (player.songs && player.songs.length == 0) {
                    playerManager.leave(player.id);
                    this.client.music.delete(player.id);
                } else {
                    player.play(player.songs[0].track);
                    this.sendNowPlayingEmbed(message, player.songs[0]);
                }
            });
            player.once("error", error => console.error(error));
            this.client.music.set(message.guild.id, player);
            this.sendNowPlayingEmbed(message, player.songs[0]);
            player.play(player.songs[0].track);
        } else {
            if(!message.member.voice.channel || (this.client.music.get(message.guild.id).channel !== message.member.voice.channel.id)) throw 'You need to be in the Voice channel where the bot is in.';
            player = this.client.music.get(message.guild.id);
            player.songs.push(response.tracks[0]);
            message.send(`Added ${response.tracks[0].info.title} to the queue!`)
        }
    }
    
    async init() {
        this.client.music = new Collection();
        playerManager = new PlayerManager(this.client, nodes, {
            user: this.client.user.id,
            shards: 1
        });
        this.client.music.set('pm', playerManager);
    }

    sendNowPlayingEmbed(message, song) {
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