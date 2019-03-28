const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            runIn: ['text'],
            requiredPermissions: [],
            requiredSettings: [],
            aliases: ['queue'],
            autoAliases: true,
            bucket: 1,
            cooldown: 0,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: 'Display the currently queued tracks.',
            extendedHelp: 'No extended help available.',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [...params]) {
        if(this.client.music.get(message.guild.id) == undefined) throw "No music running!";
        if(!message.member.voice.channel || (this.client.music.get(message.guild.id).channel !== message.member.voice.channel.id)) throw 'You need to be in the Voice channel where the bot is in.';
        const player = this.client.music.get(message.guild.id);

        // Create the rich display
        let display = new RichDisplay()
            .setFooterSuffix(` | Requested by ${message.author.tag}`)
        ;

        let embed = new MessageEmbed()
            .setTitle("Current Queue")
            .setColor('#dd67ff')
        ;

        // Add all songs to RichDisplay
        for (let i = 0; i < player.songs.length; i++) {
            embed.addField(player.songs[i].info.title, `${moment(player.songs[i].info.length).format('mm:ss')}min`, false);

            // Split content into pages by creating a new every 10 entries, unless its 0.
            if (!(i % 9) && i !== 0) {
                display.addPage(embed);

                embed = new MessageEmbed()
                    .setTitle("Current Queue")
                    .setColor('#dd67ff')
                ;
            }
        }

        // Add current page unless it is a multiple of 10 (in which case it would have already been added)
        if (player.songs.length % 10) display.addPage(embed);

        // Send the RichDisplay with 15 Reactions max and 30 seconds timeout
        return display.run(await message.send('Loading...'), {
            'jump': false,'stop': false, 'firstLast': false, 'max' : 15, 'time': 30000});
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
