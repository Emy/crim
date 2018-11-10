const { Command } = require('klasa');
const { MessageEmbed, Collection } = require('discord.js');
const { PlayerManager } = require("discord.js-lavalink");

let playerManager;

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'volume',
            enabled: true,
            runIn: ['text'],
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
            description: 'skip music',
            extendedHelp: 'skip music',
            usage: '[volume:int]',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run (message, [volume]) {
        if(this.client.music.get(message.guild.id) == undefined) throw "No music running!";
        if(volume === undefined) message.send(`Volume is at: ${this.client.music.get(message.guild.id).state.volume}%`)
        this.client.music.get(message.guild.id).volume(volume);
    }
};