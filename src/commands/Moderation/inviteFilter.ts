// import { Message } from 'discord.js';
// import { Command } from 'discord-akairo';
// import CrimClient from '../../lib/CrimClient';
// import {Logger} from 'tslog';

// const logger: Logger = LoggerUtil.getInstance().createChildLogger();

// class InviteFilterCommand extends Command {
//   client: CrimClient;
//   constructor() {
//     super('invitefilter', {
//       aliases: ['invitefilter'],
//       description: 'Activate/Deactivate the invite filter.',
//       args: [
//         {
//           id: 'bool',
//           type: 'string',
//           default: null,
//         },
//       ],
//     });
//   }

//   async exec(message: Message, args: any) {
//     logger.debug('INVITE FILTER INVOKED');
//     const guildSettings = await this.client.settings.get(message.guild.id);
//     switch (args.bool) {
//       case 'on':
//         guildSettings.enableAntiInvite = true;
//         await guildSettings.save();
//         break;
//       case 'off':
//         guildSettings.enableAntiInvite = false;
//         await guildSettings.save();
//         break;
//     }
//     message.channel.send(`Anti-Invite set to: ${guildSettings.enableAntiInvite}`);
//   }
// }

// export default InviteFilterCommand;
