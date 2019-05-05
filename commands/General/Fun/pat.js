const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ['text', 'group'],
            requiredPermissions: ['EMBED_LINKS'],
            cooldown: 5,
            description: language => language.get('COMMAND_PAT_DESCRIPTION'),
            usage: '<member:member>',
        });
    }

    async run(message, [member]) {
        let data;
        try {
            let response = await fetch('https://nekos.life/api/v2/img/pat');
            data = await response.json();
        } catch (error) {
            return message.sendLocale('ERROR_REST_REQUEST_FAILED');
        }

        if(!(data || data.url)) message.sendLocale('ERROR_REST_NO_DATA');
        let embed = new MessageEmbed()
        .setTitle(`**${message.author.username}** is patting **${member.user.username}** UwU`)
        .setColor('#dd67ff')
        .setFooter(`${message.language.get('FOOTER_REQUESTED_PROVIDED_BY', message.author.tag, 'nekos.life')}`)
        .setTimestamp()
        .setImage(data.url)
        ;
        message.send(embed);
    }

};
