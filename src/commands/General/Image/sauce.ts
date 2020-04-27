import { MessageEmbed } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage, RichDisplay } from 'klasa';
import sagiri from 'sagiri';
const snClient = sagiri(process.env.SAUCENAO_ACCESS_TOKEN);

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      enabled: true,
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['source'],
      cooldown: 30,
      description: (language) => language.get('SAUCE_DESCRIPTION'),
      usage: '<image:string>',
    });
  }

  async run(msg: KlasaMessage, [img]: [string]) {
    const lang = msg.language;
    // eslint-disable-next-line max-len
    const expr = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/;
    if (!img.match(expr)) return msg.sendLocale('NO_VALID_URL');
    const data = await snClient(img);
    if (!data) return msg.sendLocale('NO_SOURCE');
    const display = new RichDisplay();
    const noInfo = lang.get('NO_INFORMATION');

    data.forEach((sauce) => {
      const similarity = sauce.similarity || noInfo;
      const source = sauce.site || noInfo;
      const embed = new MessageEmbed()
        .setTitle(source)
        .setThumbnail(sauce.thumbnail)
        .setURL(sauce.url)
        .addField(lang.get('SIMILARITY'), similarity, true)
        .addField(lang.get('SOURCE'), source, true);
      display.addPage(embed);
    });

    display.run(msg, {
      jump: false,
      stop: false,
      firstLast: false,
      time: 30000,
    });
    return null;
  }
}
