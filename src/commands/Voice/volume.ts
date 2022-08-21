import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import CrimClient from '../../lib/CrimClient';
// import { getLogger } from '@log4js2/core';
// import { MessageEmbed } from 'discord.js';


// const logger = getLogger('Crim');

class VolumeCommand extends Command {
  declare client: CrimClient;
  constructor() {
    super('volume', {
      aliases: ['volume', 'v'],
      channel: 'guild',
      description: 'Change the volume of the music playing in vc.',
    });
  }

  async exec(message: Message) {
    // logger.debug('VOLUME COMMAND');
    // const player = this.client.music.players.get(message.guild.id) as CrimPlayer;
    // if (!player) return message.channel.send('No music running.');
    // const embed = new MessageEmbed()
    //   .setTitle('🎵 Volume')
    //   .setColor('#ffd1dc')
    //   .setDescription(
    //     'Volume changing is not available at the moment. We are searching for a viable solution as changing volume is causing a heavy load on the server. \
    //     You can just change the volume locally by right clicking on me in the voice channel and changing the volume to your liking.',
    //   );
    // message.channel.send({embeds: [embed]});;
  }
}

export default VolumeCommand;
