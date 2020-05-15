import { Event, EventStore, KlasaClient, ScheduledTask } from 'klasa';

export default class extends Event {
  constructor(client: KlasaClient, store: EventStore, file: string[], directory: string) {
    super(client, store, file, directory, {
      enabled: true,
      once: false,
    });
  }

  async run() {
    const schedules = this.client.settings.get('schedules') as ScheduledTask[];
    const found = await schedules.some(function (scheduledTask) {
      if (scheduledTask.taskName === 'presenceUpdater') return true;
    });
    if (!found) {
      this.client.schedule.create('presenceUpdater', '* * * * *', {
        catchUp: false,
      });
    }
  }
}
