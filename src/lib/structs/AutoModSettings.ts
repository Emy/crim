export default class AutoModSettings {
  enable: boolean;
  bypassRoles: Array<string>;
  bypassChannels: Array<string>;

  constructor() {
    this.enable = false;
    this.bypassRoles = [];
    this.bypassChannels = [];
  }
}

export enum ModerationCaseAction {
  'NOTICE' = 'notice',
  'WARN' = 'warning',
  'MUTE' = 'mute',
  'KICK' = 'kick',
  'BAN' = 'ban',
}
