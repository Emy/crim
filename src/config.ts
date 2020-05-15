import { KlasaClientOptions } from 'klasa';

export const config: KlasaClientOptions = {
  /**
   * General Options
   */
  ownerID: process.env.DISCORD_OWNER_ID,
  production: false,
  language: 'en-US',
  prefix: '!',

  /**
   * Caching Options
   */
  fetchAllMembers: true,
  messageCacheMaxSize: 200,
  messageCacheLifetime: 0,
  commandMessageLifetime: 1800,
  // The above 2 options are ignored while the interval is 0
  messageSweepInterval: 0,

  /**
   * Command Handler Options
   */
  commandEditing: false,
  commandLogging: false,
  typing: false,

  /**
   * Database Options
   */
  providers: {
    postgresql: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      options: {},
    },
    default: 'json',
  },

  /**
   * Custom Prompt Defaults
   */
  customPromptDefaults: {
    time: 30000,
    limit: Infinity,
    quotedStringSupport: false,
  },

  /**
   * Klasa Piece Defaults
   */
  pieceDefaults: {
    commands: {
      aliases: [],
      autoAliases: true,
      bucket: 1,
      cooldown: 0,
      description: '',
      enabled: true,
      guarded: false,
      nsfw: false,
      permissionLevel: 0,
      promptLimit: 0,
      promptTime: 30000,
      requiredPermissions: 0,
      runIn: ['text', 'dm'],
      subcommands: false,
      usage: '',
      quotedStringSupport: false,
      deletable: false,
    },
    events: {
      enabled: true,
      once: false,
    },
    extendables: {
      enabled: true,
      appliesTo: [],
    },
    finalizers: { enabled: true },
    inhibitors: {
      enabled: true,
      spamProtection: false,
    },
    languages: { enabled: true },
    monitors: {
      enabled: true,
      ignoreBots: true,
      ignoreSelf: true,
      ignoreOthers: true,
      ignoreWebhooks: true,
      ignoreEdits: true,
    },
    providers: {
      enabled: true,
    },
    tasks: { enabled: true },
  },

  /**
   * Console Event Handlers (enabled/disabled)
   */
  consoleEvents: {
    debug: false,
    error: true,
    log: true,
    verbose: false,
    warn: true,
    wtf: true,
  },

  /**
   * Console Options
   */
  console: {
    // Alternatively a Moment Timestamp string can be provided to customize the timestamps.
    timestamps: true,
    utc: false,
    colors: {
      debug: { time: { background: 'magenta' } },
      error: { time: { background: 'red' } },
      log: { time: { background: 'blue' } },
      verbose: { time: { text: 'gray' } },
      warn: { time: { background: 'lightyellow', text: 'black' } },
      wtf: { message: { text: 'red' }, time: { background: 'red' } },
    },
  },

  /**
   * Klasa Schedule Options
   */
  schedule: { interval: 60000 },
};
