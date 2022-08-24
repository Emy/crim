import { CommandInteraction, CacheType, MessageEmbed } from 'discord.js';
import { Command } from '../../framework/command/command';
import NekoClient from 'nekos.life';

export abstract class NekoImageCommand extends Command {
    constructor(id: string, description: string, nsfw: boolean) {
        super(id, {description: description, nsfw: nsfw});
    }

    public async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
    const url: string = (await this.getImage())?.url;
    if(!url){
      return interaction.reply('No image found.');
    }
    const embed = new MessageEmbed()
      .setImage(url)
      .setColor('#77dd77')
      .setFooter(
        {
          text: `Requested by: ${interaction.user.tag} | Provided by: nekos.life`,
          iconURL: interaction.user.avatarURL({ format: 'jpg' }),
        }
      );

    return interaction.reply({ embeds: [embed] });
    }

    abstract getImage(): Promise<NekoClient.NekoRequestResults>;
}