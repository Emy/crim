import { DMChannel, MessageEmbed } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      enabled: false,
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS', 'MANAGE_ROLES', 'MANAGE_CHANNELS'],
      permissionLevel: 6,
      description: (lang) => lang.get('LOCK_DESCRIPTION'),
    });
  }

  async run(msg: KlasaMessage) {
    const everyone = msg.guild.roles.cache.first();
    const channel = msg.channel;
    if (channel instanceof DMChannel) return;
    const isLocked = channel.permissionsFor(everyone).has('SEND_MESSAGES');
    await channel.updateOverwrite(everyone, { SEND_MESSAGES: !isLocked });
    const embed = new MessageEmbed().setTitle(
      isLocked ? `🔒 ${msg.language.get('CHANNEL_LOCKED')}` : `🔓 ${msg.language.get('CHANNEL_UNLOCKED')}`,
    );
    return msg.send(embed);
  }
}
