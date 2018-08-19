const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

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
            usage: '<member:user>',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [user]) {
        const embed = new MessageEmbed()
            .setTitle('Whoami command:')
            .setThumbnail(user.avatarURL())
            .setColor('DARK_GREEN')
            .addField('Name:', user.tag)
            .addField('UserID:', user.id)
            .addField('Created at:', user.createdAt)
            .setFooter(`Requested by: ${message.author.tag}`)
            .setTimestamp()
            ;
        message.send(embed);
    }

    async init() {}
};
