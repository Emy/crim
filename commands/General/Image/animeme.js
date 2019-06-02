const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: [],
            cooldown: 0,
            description: language => language.get('COMMAND_ANIMEME_DESCRIPTION'),
        });
    }

    async run(message, [...params]) {
        try {
            let data = await fetch(`https://www.reddit.com/user/emdix/m/animemes/top/.json?sort=top&t=day&limit=500`);
            let response = JSON.parse(await data.text());
            if (!(response || response.data)) throw "no data received!"
            let index = Math.floor(Math.random() * response.data.children.length);
            let embed = new MessageEmbed()
            .setTimestamp()
            .setColor('#dd67ff')
            .setImage(response.data.children[index].data.url)
            .setFooter(message.language.get('FOOTER_REQUESTED_PROVIDED_BY', message.author.tag, 'reddit.com'));
            message.send(embed);
        } catch (error) {
            let embed = new MessageEmbed();
            embed.setTitle('Something went wrong!');
            embed.setColor('red');
            message.send(embed);
        }
    }

};
