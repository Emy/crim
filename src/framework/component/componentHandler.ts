import { getLogger } from '@log4js2/core';
import { CacheType, Interaction, MessageComponentInteraction } from 'discord.js';
import CrimClient from '../../lib/CrimClient';
import { Handler } from '../handler';
import { Component } from './component';

const logger = getLogger('Crim');
/**
 * Handler to react on component interactions defined in commands
 */
export class ComponentHandler extends Handler {
  registedComponents: Map<string, Component> = new Map();
  client: CrimClient;

  constructor(client: CrimClient) {
    super();
    this.client = client;
  }

  /**
   * register a component, the customId must be the customId of the discord component
   * @param component Component
   */
  registerComponent(component: Component): void {
    this.registedComponents.set(component.customId, component);
  }

  /**
   * unregister a component based on the customId of the discord component
   *
   * @param customId customId of the discord component
   */
  unregisterComponent(customId: string): void {
    this.registedComponents.delete(customId);
  }

  /**
   * handle the user interaction of a specific component
   *
   * @param customId customId of the discord component
   * @param interaction user interaction
   */
  executeComponent(customId: string, interaction: Interaction): void {
    this.registedComponents.get(customId).onInteraction(interaction);
  }

  checkIsResponsible(interaction: Interaction<CacheType>): boolean {
    return interaction.isMessageComponent() && this.registedComponents.has(interaction.customId);
  }

  handleInteraction(interaction: MessageComponentInteraction): Promise<void> {
    const customId: string = interaction.customId;
    const component: Component = this.registedComponents.get(customId);
    if (component == null) {
      logger.warn('No component found for customId {}', customId);
      return null;
    }
    return component.onInteraction(interaction);
  }
}
