const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ['EMBED_LINKS'],
            cooldown: 5,
            nsfw: true,
            description: language => language.get('COMMAND_NEKO_DESCRIPTION'),
        });
    }

    async run(message, [...params]) {
        try {
            let data = await fetch(`https://nekos.moe/api/v1/random/image?limit=1&nsfw=${message.channel.nsfw}`);
            let response = JSON.parse(await data.text());
            let embed = new MessageEmbed()
            .setTimestamp()
            .setColor('#dd67ff')
            .setFooter(`Requested by: ${message.author.tag}`)
            .setImage(`https://nekos.moe/image/${response.images[0].id}`)
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
