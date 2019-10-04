const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      guarded: true,
      description: (language) => language.get('COMMAND_INVITE_DESCRIPTION'),
    });
  }

  async run(message) {
    return message.sendLocale('COMMAND_INVITE', ['<http://github.com/Emy/filo>']);
  }

  async init() {
    const application = this.client.application;
    if (application && !application.botPublic) this.permissionLevel = 10;
  }
};
