import NekoClient from 'nekos.life';
import { NekoActCommand } from './nekoact';

const nekos = new NekoClient();

export default class CuddleCommand extends NekoActCommand{

    constructor(){
        super("pat", 'pat someone','User to pat');
    }

    getImage(): Promise<NekoClient.NekoRequestResults> {
      return nekos.sfw.pat();
    }
    
    getAct(): string {
      return "patting";
    }
}
