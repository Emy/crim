const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ['EMBED_LINKS'],
            cooldown: 5,
            nsfw: true,
            description: language => language.get('COMMAND_BOOBS_DESCRIPTION'),
        });
    }

    async run(message, [...params]) {
        try {
            let data = await fetch(`https://nekos.life/api/v2/img/boobs`);
            let response = await data.json();
            let embed = new MessageEmbed()
            .setTimestamp()
            .setColor('#dd67ff')
            .setImage(response.url)
            .setFooter(`Requested by ${message.author.tag} | Provided by nekos.life`);
            message.send(embed);
        } catch (error) {
            let embed = new MessageEmbed();
            embed.setTitle('Something went wrong!');
            embed.setColor('red');
            message.send(embed);
        }
    }

};
