const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ['EMBED_LINKS'],
            cooldown: 5,
            description: language => language.get('COMMAND_CHUCKNORRIS_DESCRIPTION'),
        });
    }

    async run(message, [...params]) {
        try {
            let data = await fetch(`https://api.chucknorris.io/jokes/random`);
            let response = JSON.parse(await data.text());
            let embed = new MessageEmbed()
            .setTimestamp()
            .setColor('#dd67ff')
            .addField('Chuck Norris', response.value)
            .setFooter(`Requested by: ${message.author.tag} | Provided by api.chucknorris.io`)
            ;
            message.send(embed);
        } catch (error) {
            let embed = new MessageEmbed();
            embed.setTitle('Something went wrong!');
            embed.setColor('red');
            message.send(embed);
        }
    }

};
