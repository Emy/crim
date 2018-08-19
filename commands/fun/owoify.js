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
        let owoified = text.replace(/r|l/g, "w").replace(/R|L/g, "W").replace(/owo/i, 'OwO').replace(/uwu/i, 'UwU');
        let embed = new MessageEmbed()
        .setColor('#dd67ff')
        .addField('OwOified', owoified)
        .addField('Original', text)
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
        ;
        message.send(embed);
        if (message.deletable) await message.delete();
    }

    async init() {
    }

};
