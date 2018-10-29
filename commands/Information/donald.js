const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            requiredPermissions: [],
            requiredSettings: [],
            aliases: ["trump"],
            autoAliases: true,
            bucket: 1,
            cooldown: 5,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: 'Intellectual Quotes from Tronalddrump.io',
            extendedHelp: '',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [...params]) {
        let data = await fetch(`https://api.tronalddump.io/random/quote`);
        let response = JSON.parse(await data.text());

        let subject;
        if (response.tags[0]) {
            subject = `about ${response.tags[0]}`;
        } else {
            subject = '';
        }

        let embed = new MessageEmbed()
        .setTimestamp()
        .setColor('#dd67ff')
        .setTitle(`**${response._embedded.author[0].name}** tweeted ${subject}`)
        .setURL(response._embedded.source[0].url)
        .setDescription(response.value)
        // TODO: Find out if avatars.io is reliable, or follow the twitter link manually
        .setThumbnail("http://avatars.io/twitter/realDonaldTrump")
        .setFooter(`Requested by: ${message.author.tag} | Provided by tronalddump.io`)
        ;

        message.send(embed);
    }
};
