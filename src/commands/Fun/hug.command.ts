import NekoClient from 'nekos.life';
import { NekoActCommand } from './nekoact';

const nekos = new NekoClient();

export default class HugCommand extends NekoActCommand {
  constructor() {
    super('hug', 'hug someone', 'User to hug');
  }

  getImage(): Promise<NekoClient.NekoRequestResults> {
    return nekos.sfw.hug();
  }
  getAct(): string {
    return 'hugging';
  }
}
