import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import CrimClient from '../../lib/CrimClient';
import { getLogger } from '@log4js2/core';

const logger = getLogger('Crim');

class InviteFilterCommand extends Command {
  client: CrimClient;
  constructor() {
    super('invitefilter', {
      aliases: ['invitefilter'],
      description: 'Activate/Deactivate the invite filter.',
      args: [
        {
          id: 'bool',
          type: 'string',
          default: null,
        },
      ],
    });
  }

  async exec(message: Message, args: any) {
    const guildSettings = await this.client.settings.get(message.guild.id);
    switch (args.bool) {
      case 'on':
        guildSettings.enableAntiInvite = true;
        await guildSettings.save();
        break;
      case 'off':
        guildSettings.enableAntiInvite = false;
        await guildSettings.save();
        break;
    }
    message.channel.send(`Anti-Invite set to: ${guildSettings.enableAntiInvite}`);
  }
}

export default InviteFilterCommand;
