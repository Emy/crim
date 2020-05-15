import { MessageAttachment } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: 'EGAAAAL',
    });
  }

  async run(msg: KlasaMessage) {
    const attachment = new MessageAttachment('https://media.giphy.com/media/ZG5KTqutRAfZ6i5OVR/giphy.gif');
    return msg.send(attachment);
  }
}
