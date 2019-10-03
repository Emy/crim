exports.config = {
  /**
     * General Options
     */
  ownerID: process.env.DISCORD_OWNER_ID,
  // Disables/Enables a process.on('unhandledRejection'...) handler
  production: false,
  // The default language that comes with klasa. More base languages can be found on Klasa-Pieces
  language: 'en-US',
  // The default configurable prefix for each guild
  prefix: '!',
  // If custom configs should be preserved when a guild removes your bot
  preserveConfigs: true,
  // If your bot should be able to mention @everyone
  disableEveryone: false,
  // Whether d.js should queue your rest request in 'sequential' or 'burst' mode
  apiRequestMethod: 'sequential',
  // The time in ms to add to ratelimits, to ensure you wont hit a 429 response
  restTimeOffset: 500,
  // Any Websocket Events you don't want to listen to
  disabledEvents: [],
  // A presence to login with
  presence: {},
  // A once ready message for your console
  // readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guild${client.guilds.size === 1 ? '' : 's'}.`,

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
     * Sharding Options
     */
  shardId: 0,
  shardCount: 1,

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
    /*
        // Provider Connection object for process based databases:
        // rethinkdb, mongodb, mssql, mysql, postgresql
        */
    //    rethinkdb: {
    //        db: 'emybot',
    //        silent: false
    //    },
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
      requiredConfigs: [],
      requiredPermissions: 0,
      runIn: ['text', 'dm', 'group'],
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
      klasa: false,
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
      sql: false,
      cache: false,
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
     * Custom Setting Gateway Options
     */
  gateways: {
    guilds: {},
    users: {},
    clientStorage: {},
  },

  /**
     * Klasa Schedule Options
     */
  schedule: { interval: 60000 },
};
