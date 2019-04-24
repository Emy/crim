const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            requiredPermissions: [],
            requiredSettings: [],
            aliases: [],
            autoAliases: true,
            bucket: 1,
            cooldown: 3,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: true,
            permissionLevel: 0,
            description: 'foxgirl pictures (maybe NSFW)',
            extendedHelp: 'No extended help available.',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [...params]) {
        try {
            let data = await fetch(`https://nekos.life/api/v2/img/fox_girl`);
            let response = JSON.parse(await data.text());
            let embed = new MessageEmbed()
            .setTimestamp()
            .setColor('#dd67ff')
            .setImage(response.url)
            .setFooter(`Requested by ${message.author.tag} | Provided by nekos.life`)
            ;
            message.send(embed);
        } catch (error) {
            let embed = new MessageEmbed();
            embed.setTitle('Something went wrong!');
            embed.setColor('red');
            message.send(embed);
        }
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
