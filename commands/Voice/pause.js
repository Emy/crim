const { Command } = require('klasa');
const { MessageEmbed, Collection } = require('discord.js');
const { PlayerManager } = require("discord.js-lavalink");

let playerManager;

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'pause',
            enabled: true,
            runIn: ['text'],
            requiredPermissions: [],
            requiredSettings: [],
            aliases: [],
            autoAliases: true,
            bucket: 1,
            cooldown: 5,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: 'Pauses music playback',
            extendedHelp: 'Pauses music playback',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run (message, [...param]) {

        let embed = new MessageEmbed()
        .setColor('#dd67ff')
        .setTimestamp()
        .setFooter(`Requested by: ${message.author.tag}`)
        ;

        if (this.client.music.get(message.guild.id) == undefined) {
            embed.setTitle(':interrobang: No music playing');
            embed.setColor('#ff0000');

        } else if (this.client.music.get(message.guild.id).paused) {
            this.client.music.get(message.guild.id).resume();
            embed.setTitle(':arrow_forward: Resuming playback...');

            clearTimeout(this.client.music.get(`${message.guild.id}_pause_timer`));
            this.client.music.delete(`${message.guild.id}_pause_timer`);

        } else {
            this.client.music.get(message.guild.id).pause();
            embed.setTitle(':pause_button: Pausing playback');

            let timer = setTimeout(() => {
                this.client.music.get('pm').leave(message.guild.id);
                this.client.music.delete(message.guild.id);
            }, 120000);

            this.client.music.set(`${message.guild.id}_pause_timer`, timer);
        }
        
        message.send(embed);
    }
};