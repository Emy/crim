const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            name: "define",
            enabled: true,
            runIn: ['text', 'dm', 'group'],
            requiredPermissions: [],
            requiredSettings: [],
            aliases: ["urbandictionary"],
            autoAliases: true,
            bucket: 1,
            cooldown: 5,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: 'Looks up facts on Urban Dictonary.',
            extendedHelp: '',
            usage: '<searchterm:string>',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [searchterm]) {
        try {
            // Get the data from the urbandictionary api
            let data = await fetch(`http://api.urbandictionary.com/v0/define?term=${encodeURIComponent(searchterm)}`);
            let response = JSON.parse(await data.text());

            if (response.list.length == 0) {
                // Searchterm doesn't exist on Urban Dictionary
                let embed = new MessageEmbed()
                .setTitle('Oopsie')
                .setDescription(`Could not find *${searchterm}* on Urban Dictionary.`)
                .setColor('#ff0000')
                ;
                message.send(embed);
                return;
            }

            // Creates the corresponding Embed for the page Number
            //   For the description and the example, remove all the square brackets, as they
            //   were used for links before, and those no longer exist.
            //   Also cut them all down to fit into the maximum size of an Embed Field.
            function createPage(pageNr) {
                let info = response.list[pageNr];
                return new MessageEmbed()
                .setTimestamp()
                .setColor('#dd67ff')
                .setTitle(`__**${info.word}**__`.substr(0, 255))
                .setURL(info.permalink)
                .addField("*Description:*", info.definition.replace(/[\[\]]/g,'').substr(0, 1023))
                .addField("*Example:*", info.example.replace(/[\[\]]/g,'').substr(0, 1023))
                ;
            }

            // Create the rich display
            let display = new RichDisplay()
            .setFooterSuffix(` | Requested by ${message.author.tag} | Provided by Urban Dictionary`)
            ;

            // Add all the pages to the display
            for (let i = 0; i < response.list.length; i++) {
                display.addPage(createPage(i));
            }

            // Send the RichDisplay with 15 Reactions max and 30 seconds timeout
            let msg = display.run(await message.send('Loading...'), {
                'jump': false,'stop': false, 'firstLast': false, 'max' : 15, 'time': 30000});

        } catch (error) {
            // If something fucks up, show an error message.
            console.log(error);
            let embed = new MessageEmbed()
            .setTitle('Hmmm...')
            .setDescription('Something went wrong. Try again later.')
            .setColor('#ff0000')
            ;
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
