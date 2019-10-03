const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (lang) => lang.get('FACT_DESCRIPTION'),
    });
  }

  async run(msg, [...params]) {
    try {
      const data = await (await fetch(`https://nekos.life/api/v2/fact`)).json();
      msg.genEmbed()
          .addField(msg.language.get('FACT'), data.fact)
          .setProvidedBy('nekos.life')
          .send();
    } catch (error) {
      return msg.sendError('REQUEST_FAILED');
    }
  }
};
