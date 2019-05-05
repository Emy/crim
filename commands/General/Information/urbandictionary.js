const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ['EMBED_LINKS'],
            aliases: ['define', 'ud'],
            cooldown: 5,
            description: language => language.get('COMMAND_URBANDICTIONARY_DESCRIPTION'),
            usage: '<searchterm:string>',
        });
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
        response.list.forEach(function(page) {
            /* For the description and the example, remove all the square brackets, as they
              * were used for links before, and those no longer exist.
              * Also cut them all down to fit into the maximum size of an Embed Field. 
              */
            let description = page.definition.replace(/[\[\]]/g,'').substr(0, 1022)
            let example = page.example.replace(/[\[\]]/g ,'').substr(0, 1022)

            let embed = new MessageEmbed()
            .setTimestamp()
            .setColor('#dd67ff')
            .setTitle(`__**${page.word}**__`.substr(0, 255))
            .setURL(page.permalink)
            ;

            if (description) {
                embed.addField("*Description:*", description);
            }

            if (example) {
                embed.addField("*Example:*", example);
            }

            display.addPage(embed);
        });

        // Send the RichDisplay with 15 Reactions max and 30 seconds timeout
        return display.run(await message.send('Loading...'), {
            'jump': false,'stop': false, 'firstLast': false, 'max' : 15, 'time': 30000});
    }
};
