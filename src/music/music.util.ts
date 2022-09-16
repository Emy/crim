import {
  CommandInteraction,
  Interaction,
  MessageActionRow,
  MessageSelectMenu,
  MessageSelectOptionData,
  SelectMenuInteraction,
  VoiceBasedChannel,
} from 'discord.js';
import CrimClient from '../lib/CrimClient';
import { Manager, Player, SearchResult, Track } from 'erela.js';
import humanizeDuration from 'humanize-duration';
import { Status } from '../commands/Voice/status';
import { getLogger } from '@log4js2/core';
import { ComponentHandler } from '../framework/component/componentHandler';
import { HandlerTyp } from '../framework/handler';
import { TrackSelectMenuComponent } from './trackselectcomponent';

const NO_PLAYER_FOUND = 'No music running...';
const NOT_IN_VOICE = 'Not in a voice channel.';
const NOT_IN_SAME_VOICE = 'Not in the voice channel with running player.';
const NO_RUNNING_MUSIC = 'No music running...';
const MAX_TRACK_OPTIONS = 5;
const logger = getLogger('Crim');
/**
 * Utilmethods to communicate with Lavalink
 */
export class MusicUtils {
  /**
   * Repeat the actual Track
   *
   * @param interaction Loop CommandInteraction
   * @returns Message to descripe method execution
   */
  public static loop(interaction: CommandInteraction): Status {
    const manager: Manager = this.getManager(interaction);
    const player: Player = manager.get(interaction.guild.id);
    if (!player) return this.createErrorStatus(NO_PLAYER_FOUND);
    const loopEnabled: boolean = player.trackRepeat;
    player.setTrackRepeat(!loopEnabled);
    return this.createSuccessStatus(
      player.trackRepeat ? 'I am looping the current track.' : 'I will stop looping the currently playing track.',
    );
  }

  /**
   * Create a player in voice chat and search and play music based on title in {@link interaction}
   *
   * @param interaction Play CommandInteraction, must contain title option
   * @returns Message to descripe method execution
   */
  public static async play(interaction: CommandInteraction): Promise<Status> {
    const manager: Manager = this.getManager(interaction);
    const channel: VoiceBasedChannel = this.getVoiceChannelOfMember(interaction);
    if (!channel) return this.createErrorStatus(NOT_IN_VOICE);
    logger.info(`Test ${channel.id}`);
    const player: Player = manager.create({
      guild: interaction.guild.id,
      voiceChannel: channel.id,
      textChannel: interaction.channel.id,
    });
    if (player.state !== 'CONNECTED') player.connect();
    const title: string = interaction.options.getString('title');
    if (!title) return this.createErrorStatus('no title found');
    return this.playByTitle(player, title, interaction);
  }

  private static async playByTitle(player: Player, title: string, interaction: Interaction): Promise<Status> {
    let res: SearchResult;
    try {
      res = await player.search(title, interaction.user);
      if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy();
        throw res.exception;
      }
    } catch (err) {
      logger.error('Error', err);
      return this.createErrorStatus('search for title could not be completed');
    }
    switch (res.loadType) {
      case 'NO_MATCHES':
        if (!player.queue.current) player.destroy();
        return this.createSuccessStatus('no match found');
      case 'TRACK_LOADED':
        player.queue.add(res.tracks[0]);

        if (!player.playing && !player.paused && !player.queue.size) player.play();
        return this.createSuccessStatus(`The Track: **${res.tracks[0].title}** has been added to the queue.`);
      case 'PLAYLIST_LOADED':
        player.queue.add(res.tracks);

        if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
        return this.createSuccessStatus(`The Playlist: **${res.playlist.name}** has been added to the queue.`);
      case 'SEARCH_RESULT':
        if (interaction.isCommand()) {
          await this.createSelectMenuOfTracks(interaction, res.tracks);
        } else {
          const tracksSlice: Track[] = res.tracks.slice(0, MAX_TRACK_OPTIONS);
          player.queue.add(tracksSlice);
          if (!player.playing && !player.paused && !player.queue.size) player.play();
        }

        return this.createSuccessStatus('Test');
    }
  }

  public static async playTracks(interaction: SelectMenuInteraction): Promise<Status> {
    const manager: Manager = this.getManager(interaction);
    const player: Player = manager.get(interaction.guild.id);
    if (!player) return this.createErrorStatus(NO_PLAYER_FOUND);
    for (const trackUri of interaction.values) {
      const status: Status = await this.playByTitle(player, trackUri, interaction);
      if (status.error) {
        return status;
      }
    }
    return this.createSuccessStatus('All tracks are added to queue');
  }

  private static async createSelectMenuOfTracks(interaction: CommandInteraction, tracks: Track[]): Promise<void> {
    const tracksSlice: Track[] = tracks.slice(0, MAX_TRACK_OPTIONS);
    const options: MessageSelectOptionData[] = [];
    for (const track of tracksSlice) {
      options.push({ label: `${track.title} of ${track.author}`, value: track.uri });
    }
    const menu = new MessageSelectMenu()
      .setCustomId(interaction.id + '_select_track')
      .setMinValues(1)
      .setMaxValues(MAX_TRACK_OPTIONS)
      .setPlaceholder('Nothing selected')
      .addOptions(options);
    const handler: ComponentHandler = this.getComponentHandler(interaction);
    handler.registerComponent(new TrackSelectMenuComponent(interaction.id + '_select_track', menu));
    const row = new MessageActionRow().addComponents(menu);
    await interaction.reply({
      content: 'Please select at least one track in list:',
      components: [row],
      ephemeral: true,
    });
  }

  private static getManager(interaction: Interaction): Manager {
    const client: CrimClient = interaction.client as CrimClient;
    const manager: Manager = client.manager;
    return manager;
  }

  private static getComponentHandler(interaction: Interaction): ComponentHandler {
    const client: CrimClient = interaction.client as CrimClient;
    return client.getHandlerByType(HandlerTyp.COMPONENT) as ComponentHandler;
  }

  /**
   * Pause the actual Track, or if paused, resuming the music
   *
   * @param interaction Pause CommandInteraction
   * @returns Message to descripe method execution
   */
  public static pause(interaction: CommandInteraction): Status {
    const manager: Manager = this.getManager(interaction);
    const player: Player = manager.get(interaction.guild.id);
    if (!player) return this.createErrorStatus(NO_PLAYER_FOUND);
    const channel: VoiceBasedChannel = this.getVoiceChannelOfMember(interaction);
    if (!channel) return this.createErrorStatus(NOT_IN_VOICE);
    if (channel.id !== player.voiceChannel) return this.createErrorStatus(NOT_IN_SAME_VOICE);

    player.pause(!player.paused);
    return this.createSuccessStatus(player.paused ? 'Paused the music' : 'Resuming the music.');
  }

  /**
   * Returns the first 10 tracks in queue, if exists, or a error message
   *
   * @param interaction queue CommandInteraction
   * @returns the first 10 tracks in queue, if exists, or a error message
   */
  public static queue(interaction: CommandInteraction): Status {
    const manager: Manager = this.getManager(interaction);
    const player: Player = manager.get(interaction.guild.id);
    if (!player) return this.createErrorStatus(NO_PLAYER_FOUND);
    let queue = '';
    player.queue.forEach((track, index) => {
      if (index >= 10) return;
      queue += `${index + 1}: **${track.title}** (${humanizeDuration(Math.floor(track.duration), {
        maxDecimalPoints: 0,
      })})\n`;
    });
    return this.createSuccessStatus(
      queue == '' ? 'No tracks in queue' : 'Showing the 10 most recent tracks... \n\n' + queue,
    );
  }

  /**
   * Stop the music and destroy the music player
   *
   * @param interaction stop CommandInteraction
   * @returns Message to descripe method execution
   */
  public static stop(interaction: CommandInteraction): Status {
    const manager: Manager = this.getManager(interaction);
    const player: Player = manager.get(interaction.guild.id);
    if (!player) return this.createErrorStatus(NO_PLAYER_FOUND);
    const channel: VoiceBasedChannel = this.getVoiceChannelOfMember(interaction);
    if (!channel) return this.createErrorStatus(NOT_IN_VOICE);
    if (channel.id !== player.voiceChannel) return this.createErrorStatus(NOT_IN_SAME_VOICE);

    player.destroy();
    return this.createSuccessStatus('Stopping the music...');
  }

  /**
   * Skip the actual Track
   *
   * @param interaction skip CommandInteraction
   * @returns Message to descripe method execution
   */
  public static skip(interaction: CommandInteraction): Status {
    const manager: Manager = this.getManager(interaction);
    const player: Player = manager.get(interaction.guild.id);
    if (!player) return this.createErrorStatus(NO_PLAYER_FOUND);
    const channel: VoiceBasedChannel = this.getVoiceChannelOfMember(interaction);
    if (!channel) return this.createErrorStatus(NOT_IN_VOICE);
    if (channel.id !== player.voiceChannel) NOT_IN_SAME_VOICE;
    if (!player.queue.current) return this.createErrorStatus(NO_RUNNING_MUSIC);

    player.stop();
    return this.createSuccessStatus('Skipping the track...');
  }

  /**
   * Set the volume of the player, the volume must be an option on {@link interaction}, and between 1 and 100
   *
   * @param interaction volume CommandInteraction, with volume option, with a number between 1 and 100
   * @returns Message to descripe method execution
   */
  public static volume(interaction: CommandInteraction): Status {
    const manager: Manager = this.getManager(interaction);
    const player: Player = manager.get(interaction.guild.id);
    if (!player) return this.createErrorStatus(NO_PLAYER_FOUND);
    const channel: VoiceBasedChannel = this.getVoiceChannelOfMember(interaction);
    if (!channel) return this.createErrorStatus(NOT_IN_VOICE);
    if (channel.id !== player.voiceChannel) return this.createErrorStatus(NOT_IN_SAME_VOICE);

    const volume: number = interaction.options.getNumber('volume');
    if (!volume || volume < 1 || volume > 100)
      return this.createErrorStatus('you need to give a volume between 1 and 100.');

    player.setVolume(volume);
    return this.createSuccessStatus(`Set the music volume to \`${volume}\`.`);
  }

  /**
   * Returns the actual track title with actual time in track as position and duration of track as time, or the error message
   *
   * @param interaction nowplaying CommandInteraction
   * @returns the actual track title with actual time in track as position and duration of track as time, or the error message
   */
  public static nowplaying(
    interaction: CommandInteraction,
  ): { title: string; position: string; time: string } | string {
    const manager: Manager = this.getManager(interaction);
    const player: Player = manager.get(interaction.guild.id);
    if (!player) return NO_PLAYER_FOUND;
    if (!player.queue.current) return NO_RUNNING_MUSIC;
    return {
      title: player.queue.current.title,
      position: humanizeDuration(Math.floor(player.position), { maxDecimalPoints: 0 }),
      time: humanizeDuration(Math.floor(player.queue.current.duration)),
    };
  }

  static createErrorStatus(message: string): Status {
    return { error: true, message };
  }

  static createSuccessStatus(message: string): Status {
    return { error: false, message };
  }

  static getVoiceChannelOfMember(interaction: CommandInteraction): VoiceBasedChannel {
    const guild = interaction.client.guilds.cache.get(interaction.guildId);
    const member = guild.members.cache.get(interaction.member.user.id);
    return member.voice.channel;
  }
}
