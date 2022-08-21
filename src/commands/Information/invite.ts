import { Message } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { Command } from 'discord-akairo';

class InviteCommand extends Command {
  constructor() {
    super('invite', {
      aliases: ['invite'],
      description: 'Show an embed that explains how to invite the bot.',
    });
  }

  async exec(message: Message) {
    const embed = new MessageEmbed()
      .setTitle('Invite')
      .setColor('#b39eb5')
      .setThumbnail(this.client.user.avatarURL({ format: 'jpg' }))
      .setDescription(
        `Add **${this.client.user.username}** to a server by clicking the following invite link: [Invite](https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=268725328&scope=bot)

        This link contains preconfigured settings. You can change them to your liking on the website or in the roles tab.`,
      )
      .setFooter({text: `Requested by: ${message.author.tag}`, iconURL: message.author.avatarURL({ format: 'jpg' })});
    return message.channel.send({embeds: [embed]});;
  }
}

export default InviteCommand;
