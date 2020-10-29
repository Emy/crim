import GuildSettings from '../../models/GuildSettings';
import { Collection } from 'discord.js';
import { DocumentType, getModelForClass } from '@typegoose/typegoose';

const GuildSettingsModel = getModelForClass(GuildSettings);

export default class GuildSettingsManager {
  cache: Collection<string, DocumentType<GuildSettings>>;

  constructor() {
    this.cache = new Collection();
  }

  async get(guildID: string) {
    if (this.cache.has(guildID)) return this.cache.get(guildID);
    let guildSettings = await GuildSettingsModel.findOne({ gID: guildID });
    if (!guildSettings) {
      guildSettings = await GuildSettingsModel.create({
        gID: guildID,
      });
    }
    this.cache.set(guildID, guildSettings);
    return guildSettings;
  }
}
