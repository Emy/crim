import { KlasaClient, Task, TaskOptions, TaskStore } from 'klasa';
let currentPosition = 0;

export default class extends Task {
  constructor(client: KlasaClient, store: TaskStore, file: string[], directory: string, options?: TaskOptions) {
    super(client, store, file, directory, options);
  }

  async run() {
    const presenceRotation = [
      `with ${this.client.users.cache.size} users.`,
      `on ${this.client.guilds.cache.size} servers.`,
      `@${this.client.user.username} help`,
      `@${this.client.user.username} invite`,
    ];
    currentPosition = currentPosition % presenceRotation.length;
    this.client.user.setPresence({
      activity: {
        name: presenceRotation[currentPosition++],
      },
      status: 'online',
    });
  }
}
