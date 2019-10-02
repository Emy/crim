const { Command, RichDisplay } = require('klasa');
const SauceNAO = require('saucenao');
const emoji = require('../../../util/emoji');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      enabled: false,
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['source'],
      cooldown: 30,
      description: (language) => language.get('SAUCE_DESCRIPTION'),
      usage: '<image:string>',
    });
  }

  async run(msg, [img]) {
    const lang = msg.language;
    // eslint-disable-next-line max-len
    const expr = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (!img.match(expr)) return msg.sendError(lang.get('NO_VALID_URL'));
    const data = (await new SauceNAO(img)).json;
    if (!data || !data.results) return msg.sendError(lang.get('NO_SOURCE'));
    const results = data.results.slice(0, 10);
    const display = new RichDisplay();
    const noInfo = lang.get('NO_INFORMATION');

    results.forEach((sauce) => {
      const similarity = sauce.header.similarity || noInfo;
      const source = sauce.data.source || noInfo;
      const part = sauce.data.part || noInfo;
      const year = sauce.data.year || noInfo;
      const estTime = sauce.data.est_time || noInfo;

      const embed = msg.genEmbed()
          .setTitle(lang.get('SOURCE_SEARCH'))
          .setThumbnail(sauce.header.thumbnail)
          .addField(lang.get('SIMILARITY'), similarity, true)
          .addField(lang.get('SOURCE'), source, true)
          .addField(lang.get('PART'), part, true)
          .addField(lang.get('YEAR'), year, true)
          .addField(lang.get('ESTIMATED_TIMESTAMP'), estTime, true)
          .setProvidedBy('saucenao.com');
      display.addPage(embed);
    });

    display.setEmojis({
      first: emoji.previous,
      back: emoji.back,
      forward: emoji.forward,
      last: emoji.next,
      jump: emoji.page,
      stop: emoji.stop,
    });

    return display.run(msg, {
      'jump': false, 'stop': false, 'firstLast': false, 'time': 30000});
  }
};
