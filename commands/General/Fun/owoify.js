const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredSettings: ['EMBED_LINKS'],
      aliases: ['owo'],
      cooldown: 5,
      description: (language) => language.get('COMMAND_OWOIFY_DESCRIPTION'),
      usage: '<text:string>',
    });
  }

  async run(message, [text]) {
    const owoified = text.replace(/r|l/g, 'w')
        .replace(/R|L/g, 'W')
        .replace(/owo/i, 'OwO')
        .replace(/uwu/i, 'UwU');
    const embed = new MessageEmbed()
        .init('nekos.life')
        .addField('OwOified', owoified)
        .addField('Original', text);
    message.send(embed);
    if (message.deletable) await message.delete();
  }
};
