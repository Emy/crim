const { Command } = require('klasa');
const nhentai = require('nhentai-js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      enabled: true,
      requiredPermissions: [],
      nsfw: true,
      description: (language) => language.get('NUMBER_DESCRIPTION'),
      usage: '<number:string>',
    });
  }

  async run(msg, [number]) {
    if (!nhentai.exists(number)) return msg.send('no hentai found...');
    const doujin = await nhentai.getDoujin(number);
    msg.genEmbed()
        .setTitle(doujin.title)
        .setURL(doujin.link)
        .setThumbnail(doujin.thumbnails[0])
        .addField(msg.language.get('ARTIST'), doujin.details.artists.map((artist) => artist.split('(')[0].trim()).join(', '))
        .addField(msg.language.get('TAGS'), doujin.details.tags.map((tags) => tags.split('(')[0].trim()).join(', '))
        .setProvidedBy('nhentai.net')
        .send();
    console.log(doujin);
  }
};
