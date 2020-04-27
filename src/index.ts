require('dotenv').config();
import Sentry from '@sentry/node';
import { Client, KlasaClientOptions } from 'klasa';
import { Shoukaku, ShoukakuOptions } from 'shoukaku';
import { config } from './config';

if (process.env.NODE_ENV == 'production') Sentry.init({ dsn: process.env.SENTRY_DSN });

const shoukakuConfig: ShoukakuOptions = {
  moveOnDisconnect: true,
  resumable: true,
  resumableTimeout: 30,
  reconnectTries: 1000000,
  restTimeout: 10000,
};

const shoukakuNodes = [
  {
    name: process.env.VOICE_NAME,
    host: process.env.VOICE_HOST,
    port: parseInt(process.env.VOICE_PORT),
    auth: process.env.VOICE_PASSWORD,
  },
];

class FiloClient extends Client {
  shoukaku: Shoukaku;
  //queue: Queue;
  constructor(options: KlasaClientOptions) {
    super(options);
    this.shoukaku = new Shoukaku(this, shoukakuNodes, shoukakuConfig);
    //this.queue = new Queue(this);
    this.shoukaku.on('ready', (name, resumed) =>
      console.log(
        `Lavalink Node: ${name} is now connected. This connection is ${resumed ? 'resumed' : 'a new connection'}`,
      ),
    );
    this.shoukaku.on('error', (name, error) => console.log(`Lavalink Node: ${name} emitted an error.`, error));
    this.shoukaku.on('close', (name, code, reason) =>
      console.log(`Lavalink Node: ${name} closed with code ${code}. Reason: ${reason || 'No reason'}`),
    );
    this.shoukaku.on('disconnected', (name, reason) =>
      console.log(`Lavalink Node: ${name} disconnected. Reason: ${reason || 'No reason'}`),
    );
  }
}
new FiloClient(config).login(process.env.DISCORD_ACCESS_TOKEN);
