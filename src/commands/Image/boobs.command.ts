import NekoClient from 'nekos.life';
import { NekoImageCommand } from './nekoimage';

const nekos = new NekoClient();

export default class BoobsCommand extends NekoImageCommand {
  constructor() {
    super('boobs', "Get a random boob picture/gif. (NSFW only)", true);
  }

  getImage(): Promise<NekoClient.NekoRequestResults> {
    return nekos.nsfw.boobs();
  }
}
