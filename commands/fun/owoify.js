const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
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
            description: '',
            extendedHelp: 'No extended help available.',
            usage: '<text:string>',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [text]) {
        try {
            let data = await fetch(`https://nekos.life/api/v2/owoify?text=${encodeURIComponent(text)}`);
            let response = JSON.parse(await data.text());
            let embed = new MessageEmbed()
            .setColor('#dd67ff')
            .addField('OwOified', response.owo)
            .addField('Original', text)
            .setFooter(`Requested by: ${message.author.tag}`)
            .setTimestamp()
            ;
            message.send(embed);
            if (message.deletable) await message.delete();
        } catch (error) {
            console.log(error);
            let embed = new MessageEmbed();
            embed.setTitle('Something went wrong!');
            embed.setColor('red');
            message.send(embed);
        }
    }

    async init() {
    }

};
