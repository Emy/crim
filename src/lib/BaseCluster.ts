import { BaseCluster } from "kurasuta";
import { load } from 'ts-dotenv';

const env = load({
  DISCORD_ACCESS_TOKEN: String,
});


export default class extends BaseCluster {

  launch() {
      this.client.login(env.DISCORD_ACCESS_TOKEN);
  }

}