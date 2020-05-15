import { Command, CommandStore, KlasaClient, KlasaMessage, Language } from 'klasa';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      runIn: ['text'],
      guarded: true,
      description: (language: Language) => language.get('COMMAND_INVITE_DESCRIPTION'),
    });
  }

  async run(msg: KlasaMessage) {
    return msg.sendLocale('COMMAND_INVITE', ['<http://github.com/Emy/filo>']);
  }

  async init() {
    const application = this.client.application;
    if (application && !application.botPublic) this.permissionLevel = 10;
  }
}
