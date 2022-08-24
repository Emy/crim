import { CacheType, CommandInteraction, MessageActionRow, MessageButton } from 'discord.js';
import { MessageButtonStyles } from 'discord.js/typings/enums';
import { Command } from '../../framework/command/command';

export default class InviteCommand extends Command {
  constructor() {
    super('invite', {
      description: 'Show an embed that explains how to invite the bot.',
    });
  }

  public execute(interaction: CommandInteraction<CacheType>): Promise<void> {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Invite')
        .setStyle(MessageButtonStyles.LINK)
        .setURL(
          `https://discord.com/oauth2/authorize?client_id=${interaction.client.user.id}&permissions=268725328&scope=bot`,
        ),
    );
    return interaction.reply({
      content: `Add **${interaction.client.user.username}** to a server by clicking the following button:`,
      components: [row],
    });
  }
}
