import { Interaction } from 'discord.js';

/**
 * Type of Handler
 */
export enum HandlerTyp {
  COMMAND = 1,
  COMPONENT = 2,
}

/**
 * Common Methods for Handler
 */
export abstract class Handler {
  /**
   * check is the handler responsible for the interaction
   * @param interaction received interaction
   */
  abstract checkIsResponsible(interaction: Interaction): boolean;
  /**
   * handle received interaction
   *
   * @param interaction received interaction
   */
  abstract handleInteraction(interaction: Interaction): Promise<void>;
}
