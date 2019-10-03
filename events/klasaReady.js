const { Event } = require('klasa');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      enabled: true,
      once: false,
    });
  }

  async run() {
    const schedules = this.client.settings.get('schedules');
    const found = await schedules.some(function(scheduledTask) {
      if (scheduledTask.taskName === 'presenceUpdater') return true;
    });
    if (!found) {
      this.client.schedule.create('presenceUpdater', '* * * * *', {
        catchUp: false,
      });
    }
  }
};
