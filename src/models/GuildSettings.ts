import { prop } from '@typegoose/typegoose';

export default class GuildSettings {
  @prop({ required: true })
  public gID!: string;

  @prop({ required: false, default: '!' })
  public prefix?: string;

  @prop({ required: false, default: false })
  public enableAntiInvite?: boolean;

  @prop({ required: false, default: false })
  public enableWordFilter?: boolean;

  @prop({ required: false, default: undefined })
  public automodLogChannelID?: string;

  @prop({ required: false, type: String, default: [] })
  public filterWords?: string[];
}
