import NekoClient from 'nekos.life';
import { NekoActCommand } from './nekoact';

const nekos = new NekoClient();

export default class CuddleCommand extends NekoActCommand {
  constructor() {
    super('cuddle', 'cuddle someone', 'User to cuddle');
  }

  getImage(): Promise<NekoClient.NekoRequestResults> {
    return nekos.sfw.cuddle();
  }
  getAct(): string {
    return 'cuddling';
  }
}
