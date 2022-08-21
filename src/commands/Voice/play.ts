import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import CrimClient from '../../lib/CrimClient';
// import fetch from 'node-fetch';
// import { URLSearchParams } from 'url';
// import { MessageEmbed } from 'discord.js';

class PlayCommand extends Command {
  declare client: CrimClient;
  constructor() {
    super('play', {
      aliases: ['play'],
      channel: 'guild',
      description: 'Play a track.',
      args: [
        {
          id: 'search',
          match: 'text',
        },
      ],
    });
  }

  // condition(message: Message): boolean {
  //   if (!message.member.voice.channelID) {
  //     message.channel.send('Not in a voice channel.');
  //     return false;
  //   }
  //   const player = this.client.music.players.get(message.guild.id) as CrimPlayer;
  //   if (!player) return true;
  //   if (player.state.)
  // }

  async exec(message: Message, args: PlayCommandArguments) {
    // if (!message.member.voice.channelId) return message.channel.send('Not in a voice channel.');
    // const search = args.search as string;
    // const idealNode = this.client.music?.idealNodes[0];
    // if (!idealNode) return message.channel.send('No nodes found... Try again later.');
    // await this.handleSearch(idealNode, message, search);
  }

  // async handleSearch(node: LavalinkNode, message: Message, search: string) {
  //   const params = new URLSearchParams();
  //   params.append('identifier', search);
  //   const response = await (
  //     await fetch(`http://${node.host}:${node.port}/loadtracks?${params}`, {
  //       headers: { Authorization: node.password },
  //     })
  //   ).json();

  //   const embed = new MessageEmbed();

  //   switch (response.loadType) {
  //     case 'TRACK_LOADED':
  //       await this.handleTracks(node, message, response.tracks);
  //       embed
  //         .setTitle('🎵 Added Track')
  //         .setColor('#ffd1dc')
  //         .setDescription(`The Track: **${response.tracks[0].info.title}** has been added to the queue.`);
  //       message.channel.send({embeds: [embed]});;
  //       break;
  //     case 'PLAYLIST_LOADED':
  //       await this.handleTracks(node, message, response.tracks);
  //       embed
  //         .setTitle('🎵 Added Playlist')
  //         .setColor('#ffd1dc')
  //         .setDescription(`The Playlist: **${response.playlistInfo.name}** has been added to the queue.`);
  //       message.channel.send({embeds: [embed]});;
  //       break;
  //     default:
  //       this.tryYTSearch(node, message, search);
  //       break;
  //   }

  //   return false;
  // }

  // async tryYTSearch(node: LavalinkNode, message: Message, search: string) {
  //   const params = new URLSearchParams();
  //   params.append('identifier', 'ytsearch:' + search);
  //   const response = await (
  //     await fetch(`http://${node.host}:${node.port}/loadtracks?${params}`, {
  //       headers: { Authorization: node.password },
  //     })
  //   ).json();

  //   const embed = new MessageEmbed();

  //   switch (response.loadType) {
  //     case 'SEARCH_RESULT':
  //       embed.setTitle('🔍 Track search');
  //       const numbers = { '1️⃣': 1, '2️⃣': 2, '3️⃣': 3, '4️⃣': 4, '5️⃣': 5 };
  //       let count = 0;
  //       response.tracks.slice(0, 5).forEach((track) => {
  //         embed.addField(`${Object.keys(numbers)[count++]} ${track.info.title}`, track.info.author);
  //       });
  //       count = 0;
  //       const msg = await message.channel.send({embeds: [embed]});;
  //       response.tracks.slice(0, 5).forEach(() => {
  //         msg.react(Object.keys(numbers)[count++]);
  //       });
  //       msg
  //         .awaitReactions(
  //           {
  //             filter: (reaction, user) => user.id === message.author.id && Object.keys(numbers).includes(reaction.emoji.name),
  //             time: 15000,
  //             max: 1,
  //           },
  //         )
  //         .then((collected) => {
  //           const reaction = collected.first();
  //           this.handleTracks(node, message, [response.tracks[Number.parseInt(reaction.emoji.name) - 1]]);
  //           msg.reactions.removeAll();
  //           const embed = new MessageEmbed()
  //             .setTitle('🎵 Added Track')
  //             .setColor('#ffd1dc')
  //             .setDescription(
  //               `The Track: **${
  //                 response.tracks[Number.parseInt(reaction.emoji.name) - 1].info.title
  //               }** has been added to the queue.`,
  //             );
  //           msg.edit({embeds: [embed]});
  //         });
  //       break;

  //     default:
  //       break;
  //   }
  // }

  // async handleTracks(node: LavalinkNode, message: Message, tracks: unknown) {
  //   const player = (this.client.music.players.get(message.guild.id) ??
  //     (await this.client.music.join({
  //       guild: message.guild.id,
  //       channel: message.member.voice.channelId,
  //       node: node.id,
  //     }))) as CrimPlayer;
  //   player.guildID = message.guild.id;
  //   if (!Array.isArray(tracks)) return;
  //   tracks.forEach((track) => {
  //     player.addTrack(message, track);
  //   });

  //   if (player.playing) return;
  //   player.nextTrack();
  // }
}

type PlayCommandArguments = {
  search: string;
};

export default PlayCommand;
