import NekoClient from 'nekos.life';
import { NekoImageCommand } from './nekoimage';

const nekos = new NekoClient();

export default class FutaCommand extends NekoImageCommand {
  constructor() {
    super('futa', "Get a random futanari picture/gif.");
  }

  getImage(): Promise<NekoClient.NekoRequestResults> {
    return nekos.nsfw.futanari();
  }
}
