import { CommandInteraction, CacheType, MessageEmbed } from "discord.js";
import { Command } from "../../framework/command/command";
import NekoClient from 'nekos.life';

const nekos = new NekoClient();

export default class CuddleCommand extends Command{
    constructor(){
        super("cuddle", {description: 'cuddle someone', usage: 'abc'})
    }

    public async execute(interaction: CommandInteraction<CacheType>): Promise<void> {

    const embed = new MessageEmbed()
      .setDescription(`**${interaction.member.user.username}** is cuddling **${undefined ?? 'themselves'}**`)
      .setColor('#77dd77')
      .setImage((await nekos.sfw.cuddle()).url)
      .setFooter({
        text: `Requested by: ${interaction.member.user.username} | Provided by: nekos.life`,
        iconURL: `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.avatar}.jpeg?`
      }
      );
    return interaction.reply({embeds: [embed]});
    }

}