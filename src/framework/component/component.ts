import { BaseMessageComponent, Interaction } from 'discord.js';

/**
 * Wrapper around BaseMessageComponent with function to be implemented,
 * what happens at user interaction with the component
 */
export abstract class Component {
  discordComponent: BaseMessageComponent;
  customId: string;

  constructor(customId: string, discordComponent: BaseMessageComponent) {
    this.customId = customId;
    this.discordComponent = discordComponent;
  }

  /**
   * handle the user interaction
   *
   * @param interaction user interaction with the component
   */
  abstract onInteraction(interaction: Interaction): Promise<void>;
}
