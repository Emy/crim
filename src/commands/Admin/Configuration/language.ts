import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      enabled: false,
      runIn: ['text'],
      requiredPermissions: [],
      requiredSettings: [],
      aliases: ['lang'],
      guarded: true,
      permissionLevel: 6,
      description: '',
    });
  }

  async run(msg: KlasaMessage) {
    // const embed = msg.genEmbed();
    // this.client.languages.map((lang) => {
    //   embed.addField(lang.get('FLAG'), lang.get('LANG'), true);
    // });
    // const sent = await embed.send();
    // this.client.languages.map((lang) => {
    //   sent.react(lang.get('FLAG'));
    // });
    return msg.send('');
  }
}
