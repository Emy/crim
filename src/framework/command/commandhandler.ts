import config from '../../config';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Routes } from 'discord-api-types/v9';
import { getLogger } from '@log4js2/core';
import { Command } from './command';
import path, { join } from 'path';
import CrimClient from '../../lib/CrimClient';
import { resolve } from 'path';
import { readdirSync } from 'fs';
import { REST } from '@discordjs/rest';

const logger = getLogger('Crim');

export class CommandHandler {
    commands: Map<String, Command> = new Map();

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
        const commands = []
        await Array.from(this.commands.values()).forEach(value => {
            commands.push(new SlashCommandBuilder().setName(value.id).setDescription(value.description ?? 'No description available.'))
            logger.info(`ID> ${value.id} DESC> ${value.description}, USAGE> ${value.usage}`)
        })
        
        rest.put(Routes.applicationGuildCommands("APPL ID", "GUILD ID"), { body: commands.map(command => command.toJSON())})
        .then(() => logger.info('Successfully registered application commands.'))
        .catch(logger.error);
        client.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;
            const { commandName } = interaction;
            try{
                await this.commands.get(commandName).execute(interaction)
            }catch(e){
                logger.info("Error ", e)
            }
        });
    }
}
