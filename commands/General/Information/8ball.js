const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 5,
      description: (lang) => lang.get('EIGHTBALL_DESCRIPTION'),
      usage: '<question:string>',
    });
  }

  async run(msg, [question]) {
    const answers = [
      'It is certain', 'As I see it, yes', 'Reply hazy try again',
      'Don\'t count on it', 'It is decidedly so', 'Most likely',
      'Ask again later', 'My reply is no', 'Without a doubt', 'Outlook good',
      'Better not tell you now', 'My sources say no', 'Yes definitely', 'Yes',
      'Cannot predict now', 'Outlook not so good', 'You may rely on it',
      'Signs point to yes', 'Concentrate and ask again', 'Very doubtful'];
    msg.genEmbed()
        .addField(msg.language.get('QUESTION'), question)
        .addField(msg.language.get('ANSWER'), answers[Math.floor(Math.random()*answers.length)])
        .send();
  }
};
