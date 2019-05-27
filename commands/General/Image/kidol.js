const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ['EMBED_LINKS'],
            cooldown: 10,
            description: language => language.get('COMMAND_KIDOL_DESCRIPTION'),
        });
    }
    
    async run(message, [...params]) {
        let data;
        try {
            let response = await fetch('http://www.kapi.xyz/api/v1/idols/random/');
            data = await response.json();
        } catch (error) {
            return message.sendLocale('ERROR_REST_REQUEST_FAILED');
        } finally {
            if(!data) return message.sendLocale('ERROR_REST_NO_DATA');
            data = data[Object.keys(data)[0]];
            let imageUrl = new URL(data[Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)]]);
            let groupAndIdol = imageUrl.pathname.split('/').slice(4,6);
            let embed = new MessageEmbed()
            .setTitle(message.language.get('TITLE_KIDOL', groupAndIdol[0], groupAndIdol[1]))
            .setColor('#dd67ff')
            .setImage(imageUrl)
            .setFooter(message.language.get('FOOTER_REQUESTED_PROVIDED_BY', message.author.tag, 'kapi.xyz'))
            .setTimestamp();
            message.send(embed);
        }
    }

};
