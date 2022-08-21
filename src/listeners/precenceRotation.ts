import { Listener } from 'discord-akairo';
import cron from 'node-cron';
import CrimClient from '../lib/CrimClient';

class ReadyListener extends Listener {
  declare client: CrimClient;
  constructor() {
    super('precenceRotation', {
      emitter: 'client',
      event: 'ready',
    });
  }

  exec() {
    console.log(`${this.client.user.username} is ready to serve all of their ${this.client.users.cache.size} users~`);
    let counter = -1;
    cron.schedule('* * * * *', () => {
      const statuses = [
        `${this.client.users.cache.size} users`,
        `${this.client.guilds.cache.size} servers`,
        `@${this.client.user.username} help`,
        `@${this.client.user.username} invite`,
      ];

      const types = [0, 3, 2, 2];

      counter = ++counter % statuses.length;

      this.client.user.setPresence({
        activities: [
          {
            name: statuses[counter],
            type: types[counter],
          }
        ]
      });
    });
  }
}

export default ReadyListener;
