const { Event } = require('klasa');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      enabled: true,
      once: false,
    });
  }

  async run(oldMember, newMember) {
    if (!(oldMember && oldMember.channel)) return;
    const player = this.client.music.get(oldMember.guild.id);
    if (!player) return;
    if (!oldMember.channel) return;
    if (oldMember.channel.id !== player.channel) return;
    if (oldMember.channel.members.size === 1) {
      const pm = this.client.music.get('pm');
      pm.leave(oldMember.guild.id);
      this.client.music.delete(oldMember.guild.id);
    }
  }
};
