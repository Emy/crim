import NekoClient from 'nekos.life';
import { NekoImageCommand } from './nekoimage';

const nekos = new NekoClient();

//TODO nsfw Variante
export default class NekoCommand extends NekoImageCommand {
  constructor() {
    super('neko', 'Get a random neko picture/gif.', false);
  }

  getImage(): Promise<NekoClient.NekoRequestResults> {
    return nekos.sfw.neko();
  }
}
