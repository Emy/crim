const { Task } = require('klasa');

module.exports = class extends Task {
  constructor(...args) {
    super(...args, { enabled: true });
    this.currentPosition = 0;
  }

  async run(data) {
    const presenceRotation = [
      `with ${this.client.users.size} users.`,
      `on ${this.client.guilds.size} servers.`,
      `@${this.client.user.username} help`,
      `@${this.client.user.username} invite`,
    ];
    this.currentPosition = this.currentPosition % presenceRotation.length;
    this.client.user.setPresence({
      activity: {
        name: presenceRotation[this.currentPosition++],
      }, status: 'online'});
  }
};
