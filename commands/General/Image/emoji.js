const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ['ATTACH_FILES'],
            aliases: ['emote'],
            cooldown: 3,
            description: language => language.get('COMMAND_EMOJI_DESCRIPTION'),
        });
    }

    async run(message, [...params]) {
        const regex = new RegExp(/<(a?):(.*):([0-9]*)>/);
        if (!message.args[0] || !message.args[0].split(' ').length === 1) throw "Couldn't detect the custom emoji";
        let pattern = message.args[0].split(' ')[0];
        let matches = regex.exec(pattern);
        if (!matches) throw 'Could not detect custom emoji!';
        let emoji = `${matches[3]}.${matches[1] === 'a' ? 'gif' : 'png'}`;
        message.send(new MessageAttachment(`https://cdn.discordapp.com/emojis/${emoji}`, emoji));
    }

};
