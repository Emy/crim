import { Command, AkairoModuleOptions, ArgumentOptions, ArgumentGenerator, DefaultArgumentOptions, BeforeAction, MissingPermissionSupplier, ExecutionPredicate, IgnoreCheckPredicate, KeySupplier, PrefixSupplier, RegexSupplier } from "discord-akairo";
import CrimClient from "./CrimClient";
import { PermissionResolvable, StringResolvable, Snowflake } from "discord.js";

export default class CrimCommand extends Command {
  client : CrimClient;
  helpText: String;

  constructor(id, options: CrimCommandOptions) {
    super(id, options);
  }

}


export interface CrimCommandOptions extends AkairoModuleOptions {
  aliases?: string[];
  args?: ArgumentOptions[] | ArgumentGenerator;
  argumentDefaults?: DefaultArgumentOptions;
  before?: BeforeAction;
  channel?: 'guild' | 'dm';
  clientPermissions?: PermissionResolvable | PermissionResolvable[] | MissingPermissionSupplier;
  condition?: ExecutionPredicate;
  cooldown?: number;
  description?: StringResolvable;
  editable?: boolean;
  flags?: string[];
  helpText?: String;
  ignoreCooldown?: Snowflake | Snowflake[] | IgnoreCheckPredicate;
  ignorePermissions?: Snowflake | Snowflake[] | IgnoreCheckPredicate;
  lock?: KeySupplier | 'guild' | 'channel' | 'user';
  optionFlags?: string[];
  ownerOnly?: boolean;
  prefix?: string | string[] | PrefixSupplier;
  ratelimit?: number;
  regex?: RegExp | RegexSupplier;
  separator?: string;
  typing?: boolean;
  userPermissions?: PermissionResolvable | PermissionResolvable[] | MissingPermissionSupplier;
  quoted?: boolean;
}