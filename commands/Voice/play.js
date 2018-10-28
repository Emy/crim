const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const { PlayerManager } = require("discord.js-lavalink");
const fetch = require('node-fetch');

const nodes = [
];

let playerManager;

module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
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
        console.log(song)

        let data = await fetch(`http://${nodes[0].host}:${nodes[0].port}/loadtracks?identifier=ytsearch:${song}`, {
            headers: {
                authorization: nodes[0].password
            }});

        let response = JSON.parse(await data.text());

        if (!data) throw "There was an error, try again";

        // { playlistInfo: {}, loadType: 'NO_MATCHES', tracks: [] }
        if (response.loadType == "NO_MATCHES") throw "No tracks found";

        // TODO: Make this pretty.
        message.send(`Playing: ${response.tracks[0].track}`);

        console.log(JSON.stringify(response, null, 4));

        if (!message.member.voice.channel) throw "You must be in a voice chat to do that";

        // Join
        let player = await playerManager.join({
            guild: message.guild.id, // Guild id
            channel: message.member.voice.channel.id, // Channel id
            host: nodes[0].host // lavalink host
        });

        player.play(response.tracks[0].track); // Track is a base64 string we get from Lavalink REST API

        player.once("error", error => console.error(error));

        // Leave voice channel and destory Player
        //playerManager.leave(message.guildID); // Player ID aka guild id
    }

    async init() {
        playerManager = new PlayerManager(this.client, nodes, {
            user: this.client.user.id,
            shards: 1
        });
    }
};