import NekoClient from 'nekos.life';
import { NekoImageCommand } from './nekoimage';

const nekos = new NekoClient();

export default class PussyCommand extends NekoImageCommand {
  constructor() {
    super('pussy', "Get a random pussy picture/gif.");
  }

  getImage(): Promise<NekoClient.NekoRequestResults> {
    return nekos.nsfw.pussy();
  }
}
