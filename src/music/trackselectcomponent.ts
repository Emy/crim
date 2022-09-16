import { BaseMessageComponent, CacheType, Interaction, SelectMenuInteraction } from 'discord.js';
import { Component } from '../framework/component/component';
import { MusicUtils } from './music.util';

export class TrackSelectMenuComponent extends Component {
  constructor(customId: string, discordComponent: BaseMessageComponent) {
    super(customId, discordComponent);
  }

  async onInteraction(interaction: Interaction<CacheType>): Promise<void> {
    await MusicUtils.playTracks(interaction as SelectMenuInteraction);
  }
}
