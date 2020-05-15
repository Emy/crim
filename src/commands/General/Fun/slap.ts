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
      description: (lang) => lang.get('SLAP_DESCRIPTION'),
      usage: '[member:member]',
    });
  }

  async run(msg: KlasaMessage, [member]: [GuildMember]) {
    const lang = msg.language;
    const author = msg.author.username;
    const user = member?.user?.username ?? msg.language.get('THEMSELVES');
    const slap = await nekos.sfw.slap();
    const embed = new MessageEmbed()
      .setDescription(msg.language.get('EMOTE_TITLE', author, msg.language.get('SLAPPING'), user, ''))
      .setImage(slap.url)
      .setFooter(
        `${lang.get('FOOTER_REQUESTED_BY')}: ${msg.author.tag} | ${lang.get('FOOTER_PROVIDED_BY')}: nekos.life`,
        msg.author.avatarURL({ format: 'jpg' }),
      )
      .setTimestamp();
    return msg.send(embed);
  }
}
