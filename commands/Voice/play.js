const { Command } = require('klasa');
const { MessageEmbed, Collection } = require('discord.js');
const { PlayerManager } = require("discord.js-lavalink");
const fetch = require('node-fetch');


let playerManager;

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'play',
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            requiredPermissions: [],
            requiredSettings: [],
            aliases: ['yt'],
            autoAliases: true,
            bucket: 1,
            cooldown: 5,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: 'Play sound via Lavalink',
            extendedHelp: 'Play sound via Lavalink',
            usage: '[song:string]',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run (message, [song]) {
        if (!message.member.voice.channel) throw "You must be in a voice chat to do that";

        let data = await fetch(`http://${nodes[0].host}:${nodes[0].port}/loadtracks?identifier=ytsearch:${song}`, {
            headers: {
                authorization: nodes[0].password
            }});
        if (!data) throw "There was an error, try again";
        let response = JSON.parse(await data.text());
        // { playlistInfo: {}, loadType: 'NO_MATCHES', tracks: [] }
        if (response.loadType == "NO_MATCHES") throw "No tracks found";

        console.log(JSON.stringify(response, null, 4));

        console.log(this.client.music.get(message.guild.id));
        let player;
        if(this.client.music.get(message.guild.id) === undefined) {
            // Join
            player = await playerManager.join({
                guild: message.guild.id, // Guild id
                channel: message.member.voice.channel.id, // Channel id
                host: nodes[0].host // lavalink host
            });
            player.songs = [];
            player.songs.push(response.tracks[0]);
            player.on("end", data => {
                console.log('//////////');
                console.log(player);
                if (player.songs[0] === undefined) {
                    console.log(player);
                    playerManager.leave(player.id);
                    this.client.music.delete(player.id);
                } else {
                    player.play(player.songs[0].track);
                    this.sendNowPlayingEmbed(message, player.songs[0]);
                    player.songs.shift();
                }
            });
            player.once("error", error => console.error(error));
            this.client.music.set(message.guild.id, player);
            this.sendNowPlayingEmbed(message, player.songs[0]);
            player.play(player.songs[0].track);
        } else {
            player = this.client.music.get(message.guild.id);
            player.songs.push(response.tracks[0]);
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
        console.log(`https://img.youtube.com/vi/${song.info.identifier}/default.jpg`);
        let embed = new MessageEmbed()
        .setTitle(song.info.title)
        .setImage(`https://img.youtube.com/vi/${song.info.identifier}/default.jpg`)
        .setTimestamp()
        .setFooter(`Uploaded by: ${song.info.author}`)
        ;
        message.send(embed);
    }
};