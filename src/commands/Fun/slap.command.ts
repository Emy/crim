import NekoClient from 'nekos.life';
import { NekoActCommand } from './nekoact';

const nekos = new NekoClient();

export default class SlapCommand extends NekoActCommand{

    constructor(){
        super("slap", 'slap someone','User to slap');
    }

    getImage(): Promise<NekoClient.NekoRequestResults> {
      return nekos.sfw.slap();
    }
    
    getAct(): string {
      return "slapping";
    }
}
