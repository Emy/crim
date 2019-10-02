const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['owo'],
      cooldown: 5,
      description: (lang) => lang.get('OWOIFY_DESCRIPTION'),
      usage: '<text:string>',
    });
  }

  async run(msg, [text]) {
    const owoified = text.replace(/r|l/g, 'w')
        .replace(/R|L/g, 'W')
        .replace(/owo/i, 'OwO')
        .replace(/uwu/i, 'UwU');
    msg.genEmbed()
        .addField('OwOified', owoified)
        .addField('Original', text)
        .send();
    if (msg.deletable) await msg.delete();
  }
};
