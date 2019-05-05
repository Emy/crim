const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ['EMBED_LINKS'],
            aliases: ['trump'],
            cooldown: 5,
            description: language => language.get('COMMAND_DONALD_DESCRIPTION'),
        });
    }

    async run(message, [...params]) {
        let data = await fetch('https://api.tronalddump.io/random/quote');
        let response = JSON.parse(await data.text());

        let subject = response.tags[0] ? `about ${response.tags[0]}` : '';

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
