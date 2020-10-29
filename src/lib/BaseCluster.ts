import { BaseCluster } from 'kurasuta';
import config from '../config';

export default class extends BaseCluster {
  launch() {
    this.client.login(config.discordToken);
  }
}
