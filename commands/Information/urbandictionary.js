const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "define",
            runIn: ['text', 'dm', 'group'],
            aliases: ["urbandictionary"],
            cooldown: 5,
            description: 'Looks up facts on Urban Dictonary.',
            extendedHelp: '',
            usage: '<searchterm:string>'
        });
    }

    /* Creates the corresponding Embed for the page Number
    *  For the description and the example, remove all the square brackets, as they
    *  were used for links before, and those no longer exist.
    *  Also cut them all down to fit into the maximum size of an Embed Field. 
    */
    createPage(pageNr) {
        let info = response.list[pageNr];
        return new MessageEmbed()
        .setTimestamp()
        .setColor('#dd67ff')
        .setTitle(`__**${info.word}**__`.substr(0, 255))
        .setURL(info.permalink)
        .addField("*Description:*", info.definition.replace('[','').replace(']','').substr(0, 1023))
        .addField("*Example:*", info.example.replace('[','').replace(']','').substr(0, 1023))
        ;
    }

    async run(message, [searchterm]) {
        let data = await fetch(`http://api.urbandictionary.com/v0/define?term=${encodeURIComponent(searchterm)}`);
        let response = JSON.parse(await data.text());

        if (response.list.length == 0) {
            let embed = new MessageEmbed()
            .setTitle('Oopsie')
            .setDescription(`Could not find *${searchterm}* on Urban Dictionary.`)
            .setColor('#ff0000')
            ;
            return message.send(embed);
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
        return display.run(await message.send('Loading...'), {
            'jump': false,'stop': false, 'firstLast': false, 'max' : 15, 'time': 30000});
    }
};
