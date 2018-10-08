const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

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
            cooldown: 5,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: 'The magic 8ball answers any of your questions. Provided by 8ball.delegator.com',
            extendedHelp: 'The magic 8ball answers any of your questions. Provided by 8ball.delegator.com',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [question]) {
        try {
            let params = encodeURIComponent(question);
            let uri = 'https://8ball.delegator.com/magic/JSON/' + params;
            let response = await fetch(uri);
            let answer = response.json();
            let embed = new MessageEmbed()
            .setTimestamp()
            .setColor('#dd67ff')
            .addField('Question:', question)
            .addField('Answer:', answer)
            .setFooter(`Requested by: ${message.author.tag} | Provided by 8ball.delegator.com`)
            ;
            message.send(embed);
        } catch (error) {
            console.log(error);
            let embed = new MessageEmbed();
            embed.setTitle('Something went wrong!');
            embed.setColor('red');
            message.send(embed);
        }
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
