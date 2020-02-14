const { Task } = require('klasa');

module.exports = class extends Task {
  constructor(...args) {
    super(...args, { enabled: true });
    this.currentPosition = 0;
  }

  async run(data) {
    const presenceRotation = [
      `with ${this.client.users.cache.size} users.`,
      `on ${this.client.guilds.cache.size} servers.`,
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
