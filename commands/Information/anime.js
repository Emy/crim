const { Command } = require('klasa');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

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
            cooldown: 10,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: 'Get anime information from anilist.co',
            extendedHelp: 'No extended help available.',
            usage: '<anime:string>',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [anime]) {
        var query = `
        query ($name: String) {
        Media (search: $name, type: ANIME) {
            id
            status
            title {
                romaji
                english
                native
            }
            coverImage {
                large
            }
            meanScore
            startDate {
                year
                month
                day
            }
            endDate {
                year
                month
                day
            }
            episodes
            genres
            }
        }`;
        let variables = {
            name: anime
        };
            
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        try {
            let response = await fetch('https://graphql.anilist.co', options);
            let data = JSON.parse(await response.text());
            let media = data.data.Media;
            if(media === null) return this.sendNotFoundEmbed(message, anime);
            let startDate = new Date(media.startDate.year, media.startDate.month-1, media.startDate.day);
            let endDate = new Date(media.endDate.year, media.endDate.month-1, media.endDate.day);
            console.log(endDate)
            let embed = new MessageEmbed()
            .setThumbnail(media.coverImage.large)
            .setColor('#dd67ff')
            .addField('Name', (media.title.english ? `[${media.title.english}]` : `[${media.title.romaji}]`) + `(https://anilist.co/anime/${media.id})`)
            .addField('Score', `${(media.meanScore/10).toFixed(1)} / 10`, true)
            .addField('Status', media.status, true)
            .addField('Start date', startDate.toDateString(), true)
            .addField('End date', media.status != 'RELEASING' ? endDate.toDateString() : 'Not finished yet.', true)
            .addField('Genres', media.genres.join(', '))
            .setFooter(`Requested by: ${message.author.tag} | Provided by Anilist.co`)
            .setTimestamp()
            ;
            message.sendEmbed(embed);
        } catch(error) {
            this.client.console.error(error);
        }
    }

    sendNotFoundEmbed(message, anime) {
        let embed = new MessageEmbed()
            .setThumbnail()
            .setColor('#dd67ff')
            .addField('No Anime found', 'No animes found for: "' + anime + '" on Anilist.co')
            .setFooter(`Requested by: ${message.author.tag} | Provided by Anilist.co`)
            .setTimestamp()
            ;
        message.sendEmbed(embed);
    }

    async init() {
    }

};
