import { CommandInteraction, CacheType, MessageEmbed, GuildMember } from 'discord.js';
import { Command } from '../../framework/command/command';
import NekoClient from 'nekos.life';

export abstract class NekoActCommand extends Command {
  constructor(id: string, description: string, usageDescription: string) {
    super(id, {
      description: description,
      usage: [{ optionName: 'User', description: usageDescription, required: false, name: 'target' }],
    });
  }

  public async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
    const target = interaction.options.getMember('target') as GuildMember;
    const sender = interaction.member as GuildMember;
    const embed = new MessageEmbed()
      .setDescription(`**${sender?.displayName}** is ${this.getAct()} **${target?.displayName ?? 'themselves'}**`)
      .setColor('#77dd77')
      .setImage((await this.getImage()).url)
      .setFooter({
        text: `Requested by: ${interaction.user.tag} | Provided by: nekos.life`,
        iconURL: interaction.user.avatarURL({ format: 'jpg', size: 128, dynamic: false }),
      });
    return interaction.reply({ embeds: [embed] });
  }

  abstract getImage(): Promise<NekoClient.NekoRequestResults>;
  abstract getAct(): string;
}
