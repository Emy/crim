import { Guild } from 'discord.js';
import { getModelForClass } from '@typegoose/typegoose';
import GuildSettings from '../../models/GuildSettings';

const GuildSettingsClass = getModelForClass(GuildSettings);

export default class CrimGuild extends Guild {
  prefix = undefined;

  constructor(client, data) {
    super(client, data);
  }

  public async getPrefix() {
    if (this.prefix) return this.prefix;
    const guildSettings = await GuildSettingsClass.findOne({ gID: this.id });
    this.prefix = guildSettings?.prefix ?? '!';
  }
}
