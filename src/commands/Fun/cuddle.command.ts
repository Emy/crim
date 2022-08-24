import { CommandInteraction, CacheType, MessageEmbed, GuildMember } from "discord.js";
import { Command } from "../../framework/command/command";
import NekoClient from 'nekos.life';
// import { getLogger } from "@log4js2/core";

// const logger = getLogger('Crim');

const nekos = new NekoClient();

export default class CuddleCommand extends Command{
    constructor(){
        super("cuddle", {description: 'cuddle someone', usage: [{optionName: 'User', description: 'User to cuddle', required: false, name: 'target'}]})
    }

    public async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
      const target = interaction.options.getMember('target') as GuildMember;
      const sender = interaction.member as GuildMember;
      const embed = new MessageEmbed()
        .setDescription(`**${sender?.displayName}** is cuddling **${target?.displayName ?? 'themselves'}**`)
        .setColor('#77dd77')
        .setImage((await nekos.sfw.cuddle()).url)
        .setFooter({
          text: `Requested by: ${interaction.user.tag} | Provided by: nekos.life`,
          iconURL: interaction.user.avatarURL({ format: "jpg", size: 128, dynamic: false })
        });
      return interaction.reply({embeds: [embed]});
    }
}
