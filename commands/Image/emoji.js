const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js')

module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            requiredPermissions: [],
            requiredSettings: [],
            aliases: [],
            autoAliases: true,
            bucket: 1,
            cooldown: 0,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: '',
            extendedHelp: 'No extended help available.',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [...params]) {
        const regex = new RegExp(/<(a?):(.*):([0-9]*)>/);
        if (message.args[0].split(' ').length === 1) {
            let pattern = message.args[0].split(' ')[0];
            let matches = regex.exec(pattern);
            let emoji;
            if (!matches) throw 'Could not detect custom emoji!';
            if (matches[1] === 'a') {
                emoji = `${matches[3]}.gif`;
            } else {
                emoji = `${matches[3]}.png`;
            }
            message.send(new MessageAttachment(`https://cdn.discordapp.com/emojis/${emoji}`, emoji))
            
        } else {
            console.log('error');
        }
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
