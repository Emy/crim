import config from './config'
import CrimClient from './lib/CrimClient'
import { Shoukaku, Connectors } from 'shoukaku';
import { Command, TestCommand } from './framework/command/command';
import { REST } from '@discordjs/rest';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Routes } from 'discord-api-types/v9';

async function start() {
    //TODO intents
    const client = new CrimClient({intents: ['DIRECT_MESSAGES', 'GUILDS', 'GUILD_MESSAGES']});
    const shoukaku = new Shoukaku(new Connectors.DiscordJS(client), config.voiceNodes);
    client.shoukaku = shoukaku;
    shoukaku.on('error', (_, error) => console.log(error));
    const map: Map<String, Command> = new Map();
    const rest = new REST({ version: '10' }).setToken(config.discordToken);
    const cmd = new TestCommand();
    const des: string = "test1";
    const id: string = "test2";
    const commands = [
        new SlashCommandBuilder().setName(id).setDescription(des),
    ]
        .map(command => command.toJSON());
    map.set(cmd.id, cmd);
    rest.put(Routes.applicationGuildCommands("942438282162229268", "942436828374523924"), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
    
        const { commandName } = interaction;
        try{
            await map.get(commandName).execute(interaction)
        }catch(e){
            console.log("Error ", e)
        }
    });
    client.login(config.discordToken);

}

start();