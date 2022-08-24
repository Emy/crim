import { ApplicationCommandOptionType, CommandInteraction  } from "discord.js";

export abstract class Command{
    aliases: string[];
    channel: string;
    description: string;
    usage: UsageOptions[];
    id: string;
    memberPermissions: number;
    parameters: Parameter[];
    nsfw: boolean;

    constructor(id: string, options: CommandOptions){
        this.id = id;
        this.description = options.description;
        this.aliases = options.aliases;
        this.channel = options.channel;
        this.usage = options.usage;
        this.memberPermissions = options.memberPermissions;
        this.parameters = options.parameters;
        this.nsfw = options.nsfw ? true : false;
    }

    public abstract execute(interaction: CommandInteraction): Promise<void>;

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
    usage?: UsageOptions[];
    memberPermissions?: number;
    parameters?: Parameter[];
    nsfw?: boolean;
}

export interface UsageOptions{
    optionName: 'String' | 'Integer' | 'Number' | 'Boolean' | 'User' | 'Member'
    description: string,
    required: boolean,
    name: string
}
