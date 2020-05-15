import { Command, CommandStore, KlasaClient } from 'klasa';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      enabled: false,
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['info', 'uinfo', 'whois'],
      cooldown: 5,
      description: (lang) => lang.get('USERINFO_DESCRIPTION'),
      usage: '<member:member>',
    });
  }

  async run(msg, [member]) {
    const lang = msg.language;
    let roles = '';
    member.roles.cache.map((r) => (r.name != '@everyone' ? (roles += `${r.name} `) : ''));
    return msg
      .genEmbed()
      .setTitle(`${member.user.username}`)
      .setThumbnail(member.user.avatarURL())
      .addField(lang.get('NAME'), member.user.tag, true)
      .addField(lang.get('USER_ID'), member.user.id, true)
      .addField(lang.get('CREATED_AT'), member.user.createdAt, true)
      .addField(lang.get('ROLES'), roles == '' ? 'No roles.' : roles)
      .send();
  }
}
