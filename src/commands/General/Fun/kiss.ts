import { GuildMember, MessageEmbed } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import Client from 'nekos.life';
const nekos = new Client();

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (lang) => lang.get('KISS_DESCRIPTION'),
      usage: '[member:member]',
    });
  }

  async run(msg: KlasaMessage, [member]: [GuildMember]) {
    const author = msg.author.username;
    const user = member?.user?.username ?? msg.language.get('THEMSELVES');
    const kiss = await nekos.sfw.kiss();
    const embed = new MessageEmbed()
      .setTitle(msg.language.get('EMOTE_TITLE', author, msg.language.get('KISSING'), user, ''))
      .setImage(kiss.url);
    return msg.send(embed);
  }
}
