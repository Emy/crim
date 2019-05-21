const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ['EMBED_LINKS'],
            aliases: ['define', 'ud'],
            cooldown: 60,
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

        let display = new RichDisplay()
        .setFooterSuffix(` | Requested by ${message.author.tag} | Provided by Urban Dictionary`);

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
            .addField("*Description:*", description ? description : 'None available.')
            .addField("*Example:*", example ? example : 'None available.');
            display.addPage(embed);
        });

        return display.run(message, {
            'jump': false,'stop': false, 'firstLast': false, 'max' : 15, 'time': 30000});
    }
};
