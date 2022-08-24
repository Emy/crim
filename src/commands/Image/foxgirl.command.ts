import NekoClient from 'nekos.life';
import { NekoImageCommand } from './nekoimage';

const nekos = new NekoClient();

export default class FoxgirlCommand extends NekoImageCommand {
  constructor() {
    super('foxgirl', "Get a random foxgirl.");
  }

  getImage(): Promise<NekoClient.NekoRequestResults> {
    return nekos.sfw.foxGirl();
  }
}
