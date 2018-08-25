const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text', 'group'],
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
            description: 'Hug people.',
            extendedHelp: 'No extended help available.',
            usage: '<member:member>',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [member]) {
        try {
            let data = await fetch('https://nekos.life/api/v2/img/hug');
            let response = JSON.parse(await data.text());
            let embed = new MessageEmbed()
            .setTitle(`**${message.author.username}** is hugging **${member.user.username}** OwO`)
            .setColor('#dd67ff')
            .setFooter(`Requested by ${message.author.tag} | Provided by nekos.life`)
            .setTimestamp()
            .setImage(response.url)
            ;
            message.send(embed);
        } catch (error) {
            console.log(error);
            let embed = new MessageEmbed();
            embed.setTitle('Something went wrong!');
            embed.setColor('red');
            message.send(embed);
        }
    }

    async init() {}

};
