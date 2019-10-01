const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['SEND_MESSAGES'],
      aliases: ['google'],
      cooldown: 5,
      description: (language) => language.get('COMMAND_LMGTFY_DESCRIPTION'),
      usage: '<topic:string>',
    });
  }

  async run(message, [topic]) {
    const query = [];
    topic.split(' ').forEach((element) => {
      query.push(encodeURIComponent(element));
    });
    message.send('https://lmgtfy.com?iie=1&q=' + query.join('+'));
  }
};
