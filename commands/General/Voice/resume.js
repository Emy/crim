const { Command } = require('klasa');
const { MessageEmbed, Collection } = require('discord.js');
const { PlayerManager } = require("discord.js-lavalink");

let playerManager;

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ['text'],
            requiredPermissions: ['EMBED_LINKS'],
            cooldown: 5,
            description: language => language.get('COMMAND_RESUME_DESCRIPTION'),
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
            embed.setTitle(':arrow_forward: Resuming playback');

            clearTimeout(this.client.music.get(`${message.guild.id}_pause_timer`));
            this.client.music.delete(`${message.guild.id}_pause_timer`);

        } else {
            embed.setTitle(':arrow_forward: Music is already playing');
        }
        
        message.send(embed);
    }
};