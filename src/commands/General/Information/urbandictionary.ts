import { MessageEmbed } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage, RichDisplay } from 'klasa';
import ud from 'urban-dictionary';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['define', 'ud'],
      cooldown: 60,
      description: (lang) => lang.get('URBANDICTIONARY_DESCRIPTION'),
      usage: '<searchterm:string>',
    });
  }

  async run(msg: KlasaMessage, [searchterm]: [string]) {
    const urban = await ud.term(searchterm);
    if (!urban) msg.sendLocale('NO_UD_FOUND');
    const display = new RichDisplay().setFooterSuffix(
      ` | Requested by ${msg.author.tag} | Provided by Urban Dictionary`,
    );

    for (const entry of urban?.entries) {
      const definition = entry?.definition.replace(/[\[\]]/g, '').substr(0, 1022);
      const example = entry?.example.replace(/[\[\]]/g, '').substr(0, 1022);

      const embed = new MessageEmbed()
        .setTitle(`__**${entry.word}**__`.substr(0, 255))
        .setURL(entry.permalink)
        .addField(msg.language.get('DEFINITION'), definition ?? msg.language.get('NO_INFORMATION'))
        .addField(msg.language.get('EXAMPLE'), example ?? msg.language.get('NO_INFORMATION'));
      display.addPage(embed);
    }

    display.run(msg, {
      jump: false,
      stop: false,
      firstLast: false,
      time: 30000,
    });

    return null;
  }
}
