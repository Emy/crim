import config from '../../config';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Routes } from 'discord-api-types/v9';
import {Logger} from 'tslog';
import { Command } from './command';
import path, { join } from 'path';
import CrimClient from '../../lib/CrimClient';
import { resolve } from 'path';
import { readdirSync } from 'fs';
import { REST } from '@discordjs/rest';
import { CommandInteraction, TextChannel } from 'discord.js';
import { LoggerUtil } from '../../logger.util';

const logger: Logger = LoggerUtil.getInstance().createChildLogger();

export class CommandHandler {
  commands: Map<string, Command> = new Map();

  constructor(client: CrimClient) {
    this.lel(client);
  }

  async lel(client: CrimClient) {
    await this.loadCommands(join(__dirname, '..', '..', 'commands'));
    this.registerCommands(client);
  }

  async loadCommands(dir: string) {
    const dirents = readdirSync(dir, { withFileTypes: true });
    for (const dirent of dirents) {
      const res = resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        await this.loadCommands(res);
      } else {
        if (res.endsWith('command.js')) {
          const command = await import(path.resolve(res));
          const commandInstance = new command.default() as Command;
          this.commands.set(commandInstance.id, commandInstance);
        }
      }
    }
  }

  async registerCommands(client: CrimClient) {
    const rest = new REST({ version: '10' }).setToken(config.discordToken);
    const commands = [];
    await Array.from(this.commands.values()).forEach((value) => {
      const handler: SlashCommandBuilder = new SlashCommandBuilder()
        .setName(value.id)
        .setDescription(value.description ?? 'No description available.');
      if (value.usage) {
        value.usage.map((usageOption) => {
          handler[`add${usageOption.optionName}Option`]((option) =>
            option.setName(usageOption.name).setDescription(usageOption.description).setRequired(usageOption.required),
          );
        });
      }
      commands.push(handler);
      logger.info(`ID> ${value.id} DESC> ${value.description}, USAGE> ${value.usage}`);
    });

    if (config.NODE_ENV === 'production') {
      rest
        .put(Routes.applicationCommands(config.applicationID), {
          body: commands.map((command) => command.toJSON()),
        })
        .then(() => logger.info('Successfully registered application commands.'))
        .catch(logger.error);
    } else {
      rest
        .put(Routes.applicationGuildCommands(config.applicationID, config.guildID), {
          body: commands.map((command) => command.toJSON()),
        })
        .then(() => logger.info('Successfully registered application commands.'))
        .catch(logger.error);
    }
    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;
      const { commandName } = interaction;
      try {
        const command: Command = this.commands.get(commandName);
        if (command.nsfw && !this.isNsfw(interaction)) {
          await interaction.reply('This command can only be run on a nsfw channel');
        } else {
          await command.execute(interaction);
        }
      } catch (e) {
        logger.error('Error ', e);
      }
    });
  }

  isNsfw(interaction: CommandInteraction): boolean {
    const guild = interaction.client.guilds.cache.get(interaction.guildId);
    const channel = guild.channels.cache.get(interaction.channelId) as TextChannel;
    return channel.nsfw;
  }
}
