import { Message } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { Command } from 'discord-akairo';

class AnimemeCommand extends Command {
  constructor() {
    super('animeme', {
      aliases: ['animeme'],
      channel: 'guild',
      description: 'Get a random animeme.',
    });
  }

  async exec(message: Message) {
    const response = await fetch(`https://www.reddit.com/user/emdix/m/animemes/top/.json?sort=top&t=day&limit=500`);
    let data = await response.json();
    if (!(data || data.data)) return 'NO DATA';
    data = data.data.children;
    const animeme = data[Math.floor(Math.random() * data.length)].data;

    const embed = new MessageEmbed()
      .setDescription(animeme.title)
      .setColor('#ffb347')
      .setImage(animeme.url)
      .setFooter(
        {
          text: `Requested by: ${message.author.tag} | Provided by: reddit.com`,
          iconURL: message.author.avatarURL({ format: 'jpg' }),
        }
      );

    return message.channel.send({embeds: [embed]});;
  }
}

export default AnimemeCommand;
