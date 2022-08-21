import { Inhibitor } from 'discord-akairo';
import { Message } from 'discord.js';
import CrimClient from '../lib/CrimClient';
import { getLogger } from '@log4js2/core';

const logger = getLogger('Crim');

class AntiInviteInhibitor extends Inhibitor {
  declare client: CrimClient;
  constructor() {
    super('antiInvite', {
      reason: 'antiInvite',
      type: 'pre',
    });
  }

  async exec(msg: Message) {
    logger.debug('ANTI-INVITE IHIBITOR INVOKED');
    if (!(msg.guild || msg.guild?.available)) return false;
    const guildSettings = await this.client.settings.get(msg.guild.id);
    if (!guildSettings.enableAntiInvite) return false;
    const invite = /(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|(discordapp|discord)\.com\/invite|invite\.gg)\/.+/;
    if (!invite.test(msg.content)) return false;
    logger.debug('ANTI INVITE INHIBITOR DETECTED AN INVITE');
    await msg.delete();
    return true;
  }
}

export default AntiInviteInhibitor;
