const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      enabled: false,
      runIn: ['text'],
      requiredPermissions: [],
      permissionLevel: 6,
      description: '',
      usage: '',
    });
  }

  async run(message, [...params]) {
  }
};
