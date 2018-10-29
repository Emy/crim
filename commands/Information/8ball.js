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
            description: 'The magic 8ball answers any of your questions.',
            extendedHelp: 'The magic 8ball answers any of your questions.',
            usage: '<question:string>',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [question]) {
        const answers = ['It is certain', 'As I see it, yes', 'Reply hazy try again', 'Don\'t count on it',
            'It is decidedly so', 'Most likely', 'Ask again later', 'My reply is no',
            'Without a doubt', 'Outlook good', 'Better not tell you now', 'My sources say no',
            'Yes definitely', 'Yes', 'Cannot predict now', 'Outlook not so good', 'You may rely on it',
            'Signs point to yes', 'Concentrate and ask again', 'Very doubtful'];
        const index = Math.floor(Math.random() * answers.length);
        try {
            let answer = answers[index];
            let embed = new MessageEmbed()
            .setTimestamp()
            .setColor('#dd67ff')
            .addField('Question:', question)
            .addField('Answer:', answer)
            .setFooter(`Requested by: ${message.author.tag} | Provided by Emybot`)
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
