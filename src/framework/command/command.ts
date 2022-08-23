import { ApplicationCommandOptionType, CacheType, CommandInteraction  } from "discord.js";

export abstract class Command{
    aliases: string[];
    channel: string;
    description: string;
    usage: string;
    id: string;
    memberPermissions: number;
    parameters: Parameter[];

    constructor(id: string, options: CommandOptions){
        this.id = id;
        this.aliases = options.aliases;
        this.channel = options.channel;
        this.description = options.usage;
        this.memberPermissions = options.memberPermissions;
        this.parameters = options.parameters;
    }

    public abstract execute(interaction: CommandInteraction): Promise<void>;

}

export class TestCommand extends Command{

    constructor(){
        super("test", {description: "test1"})
    }

    public async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        return interaction.reply('Test1');
    }

}

export interface Parameter{
    name: string,
    description: string,
    required?: boolean,
    type?: ApplicationCommandOptionType
}

export interface CommandOptions{
    aliases?: string[];
    channel?: string;
    description?: string;
    usage?: string;
    memberPermissions?: number;
    parameters?: Parameter[];
}