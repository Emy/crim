const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (language) => language.get('COMMAND_FACT_DESCRIPTION'),
    });
  }

  async run(message, [...params]) {
    try {
      const data = await fetch(`https://nekos.life/api/v2/fact`);
      const response = JSON.parse(await data.text());
      const embed = new MessageEmbed()
          .setTimestamp()
          .setColor('#dd67ff')
          .addField('Fact', response.fact)
          .setFooter(`Requested by: ${message.author.tag} | Provided by nekos.life`)
            ;
      message.send(embed);
    } catch (error) {
      console.log(error);
      const embed = new MessageEmbed();
      embed.setTitle('Something went wrong!');
      embed.setColor('red');
      message.send(embed);
    }
  }
};
