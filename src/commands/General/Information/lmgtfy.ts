import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      requiredPermissions: ['SEND_MESSAGES'],
      aliases: ['google'],
      cooldown: 5,
      description: (lang) => lang.get('LMGTFY_DESCRIPTION'),
      usage: '<topic:string>',
    });
  }

  async run(msg: KlasaMessage, [topic]: [string]) {
    const query = [];
    topic.split(' ').forEach((element) => {
      query.push(encodeURIComponent(element));
    });
    return msg.send('https://lmgtfy.com?iie=1&q=' + query.join('+'));
  }
}
