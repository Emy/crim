import { ApplicationCommandOptionType, Message  } from "discord.js";

export abstract class Command{
    aliases: string[];
    channel: string;
    description: string;
    usage: string;
    id: string;
    memberPermissions: number;
    options: UserOptions[];

    public abstract parseMessage(message: Message): void;

}

export interface UserOptions{
    name: string,
    description: string,
    required?: boolean,
    type?: ApplicationCommandOptionType
}