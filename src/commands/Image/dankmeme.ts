import { Message } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { Command } from 'discord-akairo';

class DankmemeCommand extends Command {
  constructor() {
    super('dankmeme', {
      aliases: ['dankmeme'],
      channel: 'guild',
      description: 'Get a random dank meme.',
    });
  }

  async exec(message: Message) {
    const response = await fetch(`https://www.reddit.com/user/emdix/m/dankmemes/top/.json?sort=top&t=day&limit=500`);
    let data = await response.json();
    if (!(data || data.data)) return 'NO DATA';
    data = data.data.children;
    const dankmeme = data[Math.floor(Math.random() * data.length)].data;

    const embed = new MessageEmbed()
      .setDescription(dankmeme.title)
      .setColor('#ffb347')
      .setImage(dankmeme.url)
      .setFooter(
        `Requested by: ${message.author.tag} | Provided by: reddit.com`,
        message.author.avatarURL({ format: 'jpg' }),
      );

    return message.channel.send(embed);
  }
}

export default DankmemeCommand;
