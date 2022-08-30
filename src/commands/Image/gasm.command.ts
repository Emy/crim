import NekoClient from 'nekos.life';
import { NekoImageCommand } from './nekoimage';

const nekos = new NekoClient();

export default class GasmCommand extends NekoImageCommand {
  constructor() {
    super('gasm', 'Get a random gasm picture/gif. (NSFW Only)', true);
  }

  getImage(): Promise<NekoClient.NekoRequestResults> {
    return nekos.nsfw.gasm();
  }
}
