import NekoClient from 'nekos.life';
import { NekoActCommand } from './nekoact';

const nekos = new NekoClient();

export default class KissCommand extends NekoActCommand {
  constructor() {
    super('kiss', 'kiss someone', 'User to kiss');
  }

  getImage(): Promise<NekoClient.NekoRequestResults> {
    return nekos.sfw.kiss();
  }

  getAct(): string {
    return 'kissing';
  }
}
