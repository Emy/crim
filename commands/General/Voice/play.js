const { Command } = require('klasa');
const { Collection, Util } = require('discord.js');
const { PlayerManager } = require('discord.js-lavalink');
const fetch = require('node-fetch');
const emoji = require('../../../util/emoji');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['p'],
      cooldown: 5,
      description: (lang) => lang.get('PLAY_DESCRIPTION'),
      usage: '<track:string>',
    });
  }

  async run(msg, [song]) {
    const lang = msg.language;
    if (!msg.member.voice.channel) return msg.sendError('NOT_IN_VC');
    // eslint-disable-next-line max-len
    const regex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    const matches = song.match(regex);
    song = encodeURIComponent(song);
    const pm = this.client.music.get('pm');
    const node = pm.nodes.first();
    let requestUrl = `http://${node.host}:${node.port}/loadtracks?identifier=${song}`;
    if (matches === null) {
      requestUrl = `http://${node.host}:${node.port}/loadtracks?identifier=ytsearch:${song}`;
    }
    try {
      const data = await (await fetch(requestUrl, {
        headers: {
          authorization: node.password,
        }})).json();
      if (!data) return msg.sendError('LAVALINK_NO_DATA');
      switch (data.loadType) {
        case 'TRACK_LOADED':
          await this.addTrack(msg, data.tracks[0]);
          break;
        case 'PLAYLIST_LOADED':
          await this.addPlaylist(msg, data.tracks);
          msg.genEmbed()
              .setTitle(lang.get('PLAY'))
              .setDescription(lang.get('ADDED_PLAYLIST', data.playlistInfo.name))
              .send();
          break;
        case 'SEARCH_RESULT':
          const embed = msg.genEmbed();
          let counter = 1;
          data.tracks.slice(0, 5).map((track) => {
            embed.addField(
                `**${counter++}** -> ${Util.escapeMarkdown(track.info.title)}`,
                `${lang.get('UPLOADED_BY')}: ${Util.escapeMarkdown(track.info.author)}`
            );
          });
          try {
            await embed.send();
            const promptResponse = await msg.prompt(lang.get('CHOOSE_NUMBER'));
            const track = parseInt(promptResponse.content);
            if (isNaN(track)) {
              return msg.sendError('VOICE_SELECTION_NAN');
            }
            if (!(track >= 1 && track <= data.tracks.length)) {
              return msg.sendError('SELECTION_INVALID');
            }
            await this.addTrack(msg, data.tracks[track-1]);
          } catch (error) {
            console.log(error);
            msg.send('SELECTION FAILED');
          }
          break;
        case 'NO_MATCHES':
          return msg.sendError('NO_MATCHES');
        case 'LOAD_FAILED':
          return msg.sendError('LOAD_FAILED');
        default:
          return msg.sendError('UNKNOWN_ERROR');
      }
    } catch (erorr) {
      return msg.sendError('UNKNOWN_ERROR');
    }
  }

  async addTrack(msg, track) {
    const lang = msg.language;
    const player = this.client.music.get(msg.guild.id);
    if (player) {
      if (!this.isInSameChannel(player, msg)) {
        return msg.sendError('NOT_SAME_CHANNEL');
      }
      player.songs.push(track);
      msg.genEmbed()
          .setTitle(lang.get('PLAY'))
          .setDescription(lang.get('ADDED_TRACK', track.info.title))
          .send();
    } else {
      await this.initializePlayer(msg, track);
    }
  }

  async addPlaylist(msg, tracks) {
    let player = this.client.music.get(msg.guild.id);
    if (!player) {
      await this.initializePlayer(msg, tracks.shift());
      player = this.client.music.get(msg.guild.id);
    }
    if (!this.isInSameChannel(player, msg)) {
      return msg.sendError('NOT_SAME_CHANNEL');
    }
    while (tracks.length > 0) {
      // console.log('added song:', tracks[0].info.title);
      player.songs.push(tracks.shift());
    }
  }

  async initializePlayer(msg, track) {
    const pm = this.client.music.get('pm');
    const player = await pm.join({
      guild: msg.guild.id,
      channel: msg.member.voice.channel.id,
      host: pm.nodes.first().host,
    });
    player.songs = [];
    player.loop = false;
    player.songs.push(track);
    player.on('end', (data) => {
      if (!player.loop) player.songs.shift();
      if (player.songs && player.songs.length == 0) {
        pm.leave(player.id);
        this.client.music.delete(player.id);
      } else {
        player.play(player.songs[0].track);
        this.sendNowPlayingEmbed(msg, player.songs[0]);
      }
    });
    player.once('error', (error) => console.error(error));
    this.client.music.set(msg.guild.id, player);
    this.sendNowPlayingEmbed(msg, player.songs[0]);
    player.play(player.songs[0].track);
  }

  isInSameChannel(player, msg) {
    const memberChannel = msg.member.voice.channel;
    const botChannel = player.channel;
    if (!memberChannel) return false;
    return memberChannel.id === botChannel;
  }

  sendNowPlayingEmbed(msg, song) {
    const lang = msg.language;
    msg.genEmbed()
        .setTitle(`${this.client.emojis.get(emoji.play)} ${lang.get('NOW_PLAYING')}`)
        .setDescription(Util.escapeMarkdown(song.info.title))
        .setThumbnail(`https://img.youtube.com/vi/${song.info.identifier}/default.jpg`)
        .addField(`${this.client.emojis.get(emoji.time)} ${lang.get('LENGTH')}`, msg.genHMDTime(song.info.length), true)
        .send();
  }

  async init() {
    if (this.client.music) return;
    this.client.music = new Collection();
    const playerManager = new PlayerManager(this.client, [
      {
        host: process.env.VOICE_HOST,
        port: process.env.VOICE_PORT,
        region: process.env.VOICE_REGION,
        password: process.env.VOICE_PASSWORD,
      },
    ], {
      user: this.client.user.id,
      shards: 1,
    });
    this.client.music.set('pm', playerManager);
  }
};
