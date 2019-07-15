const { Extendable } = require('klasa');
const { Message } = require('discord.js');
const { MessageEmbed } = require('discord.js')

module.exports = class extends Extendable {

    constructor(...args) {
        super(...args, {
            enabled: true,
            appliesTo: [Message]
        });
    }

    sendError(localeReason) {
        let embed = new MessageEmbed()
        .setTitle(this.language.get('ERROR_TITLE'))
        .addField(this.language.get('ERROR_REASON'),this.language.get(localeReason))
        .setColor('#DC143C')
        .setFooter(`Requested by: ${this.author.tag}`, this.author.avatarURL({format: 'jpg'}))
        .setTimestamp();
        this.send(embed)
    }
};
