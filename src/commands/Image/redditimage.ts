import { CommandInteraction, CacheType, MessageEmbed } from 'discord.js';
import { Command } from '../../framework/command/command';
import fetch from 'node-fetch';

export abstract class RedditImageCommand extends Command {
  constructor(id: string, description: string) {
    super(id, { description: description });
  }

  public async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
    const response = await fetch(this.getLink());
    let data = await response.json();
    if (!(data || data.data)) return interaction.reply('no images found');
    data = data.data.children;
    const dankmeme = data[Math.floor(Math.random() * data.length)].data;

    const embed = new MessageEmbed()
      .setDescription(dankmeme.title)
      .setColor('#ffb347')
      .setImage(dankmeme.url)
      .setFooter({
        text: `Requested by: ${interaction.user.tag} | Provided by: reddit.com`,
        iconURL: interaction.user.avatarURL({ format: 'jpg' }),
      });

    return interaction.reply({ embeds: [embed] });
  }

  abstract getLink(): string;
}
