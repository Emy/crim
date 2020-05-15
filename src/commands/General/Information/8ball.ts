import { MessageEmbed } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (lang) => lang.get('EIGHTBALL_DESCRIPTION'),
      usage: '<question:string>',
    });
  }

  async run(msg: KlasaMessage, [question]: [string]) {
    const lang = msg.language;
    const answers = [
      'It is certain',
      'As I see it, yes',
      'Reply hazy try again',
      "Don't count on it",
      'It is decidedly so',
      'Most likely',
      'Ask again later',
      'My reply is no',
      'Without a doubt',
      'Outlook good',
      'Better not tell you now',
      'My sources say no',
      'Yes definitely',
      'Yes',
      'Cannot predict now',
      'Outlook not so good',
      'You may rely on it',
      'Signs point to yes',
      'Concentrate and ask again',
      'Very doubtful',
    ];
    const embed = new MessageEmbed()
      .addField(msg.language.get('QUESTION'), question)
      .addField(msg.language.get('ANSWER'), answers[Math.floor(Math.random() * answers.length)])
      .setFooter(`${lang.get('FOOTER_REQUESTED_BY')}: ${msg.author.tag}`, msg.author.avatarURL({ format: 'jpg' }))
      .setTimestamp();
    return msg.send(embed);
  }
}
