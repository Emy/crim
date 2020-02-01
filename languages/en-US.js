/* eslint-disable max-len */
const { Language, util } = require('klasa');

module.exports = class extends Language {
  constructor(...args) {
    super(...args, { enabled: true });

    this.language = {
      DEFAULT: (key) => `${key}  has not been localized for en-US yet.`,
      DEFAULT_LANGUAGE: 'Default Language',
      COMMAND_INVITE: (repo) => [
        `To add ${this.client.user.username} to your discord guild:`,
        `<${this.client.invite}>`,
        util.codeBlock('', [
          'The above link is generated requesting the minimum permissions required to use every command currently.',
          'I know not all permissions are right for every guild, so don\'t be afraid to uncheck any of the boxes.',
          'If you try to use a command that requires more permissions than the bot is granted, it will let you know.',
        ].join(' ')),
        `Please file an issue at ${repo} if you find any bugs.`,
      ],


      // Moderation Category
      CHANNEL_LOCKED: 'Channel locked',
      CHANNEL_UNLOCKED: 'Channel unlocked',

      // Chat Bot Info Category
      STATISTICS: 'Statistics',
      MEMORY: 'Memory',
      UPTIME: 'Uptime',
      USERS: 'Users',
      GUILDS: 'Guilds',
      KLASA_VERSION: 'Klasa Version',
      NODEJS_VERSION: 'Node.js Version',
      DISCORDJS_VERSION: 'Discord.js Version',
      DEVELOPER: 'Developer',
      SOURCECODE: 'Source code',
      CLICK_HERE: 'Click here',

      // Fun Category
      THEMSELVES: 'themselves',
      CUDDLING: 'cuddling',
      HUGGING: 'hugging',
      KISSING: 'kissing',
      PATTING: 'patting',
      SLAPPING: 'slapping',
      EMOTE_TITLE: (sender, activity, receiver, suffix) => `**${sender}** is ${activity} **${receiver}** ${suffix}`,

      // Image Category
      TITLE_KIDOL: (group, idol) => `**${idol}** from **${group}**`,
      NO_INFORMATION: `N/A`,
      SOURCE_SEARCH: `Source search`,
      SIMILARITY: `Similarity`,
      SOURCE: `Source`,
      PART: `Part`,
      YEAR: `Year`,
      ESTIMATED_TIMESTAMP: `Estimated timestamp`,

      // Information Category
      QUESTION: `Question`,
      ANSWER: `Answer`,
      SCORE: `Score`,
      STATUS: `Status`,
      START_DATE: `Release date`,
      END_DATE: `End date`,
      GENRES: `Genres`,
      NAME: `Name`,
      ROLE: `Role`,
      DESCRIPTION: `Description`,
      ABOUT: `about`,
      TWEETED: `tweeted`,
      FACT: `Fact`,
      DEFINITION: `Definition`,
      EXAMPLE: `Example`,
      ARTIST: `Artist`,
      TAGS: `Tags`,


      // Voice Category
      LOOPED: `Looped`,
      UNLOOPED: `Unlooped`,
      LOOPED_DESCRIPTION: `I'll play this song over and over until I die!`,
      UNLOOPED_DESCRIPTION: `I'll stop playing the same song over and over again!`,
      NOW_PLAYING: `Now playing`,
      LENGTH: `Length`,
      PAUSED: `Paused`,
      UNPAUSED: `Unpaused`,
      UPLOADED_BY: `Uploaded by`,
      CHOOSE_NUMBER: `Choose a number!`,
      PLAY: `Play`,
      ADDED_TRACK: (track) => `Added **${track}** to the queue!`,
      ADDED_PLAYLIST: (playlist) => `Added playlist **${playlist}** to the queue!`,
      QUEUE: `Queue`,
      SKIP: `Skip`,
      SKIPPING_TRACK: `Skipping current track.`,
      STOP: `Stop`,
      STOPPING: `Stopping the music and leaving the channel!`,
      VOLUME: `Volume`,
      CURRENT_VOLUME: (volume) => `Current volume is: **${volume}%**`,
      SETTING_VOLUME: (volume) => `Setting volume to: **${volume}%**`,
      VOLUME_RESTRICTION: `Volume is restricted. You can only set between 1 and 200!`,

      // Generic
      FOOTER_REQUESTED_BY: 'Requested by',
      FOOTER_PROVIDED_BY: 'Provided by',

      // Errors
      ERROR: `Error`,
      NO_DATA: `I haven't received any data from the API! Try again later.`,
      REQUEST_FAILED: `There has been an error while sending a request to the API! Try again later!`,
      NO_CUSTOM_EMOJI_DETECTED: 'No custom emoji detected!',
      NO_VALID_URL: `I couldn't parse your input into a URL!`,
      NO_SOURCE: `I couldn't find any source for that on saucenao!`,
      NO_ANIME_FOUND: (anime) => `I could not find *${anime}* on anilist.`,
      NOT_IN_VC: `You aren't in a voice channel right now!`,
      LAVALINK_NO_DATA: `I haven't received any data from the music server! Try again later.`,
      SELECTION_NAN: `Your response isn't a valid number`,
      SELECTION_INVALID: `There was an error selecting the right option!`,
      NO_MATCHES: 'No matches were found on youtube!',
      LOAD_FAILED: `Loading the track failed!`,
      UNKNOWN_ERROR: 'An unknown error occured! If this issue persists contact my Master!',
      NOT_SAME_CHANNEL: 'You need to be in the same voice channel as me!',
      NO_UD_FOUND: 'The urban dictionary has nothing to say about your search term!',

      // Category Admin command descriptions
      // Sub category Moderation
      KICK_DESCRIPTION: 'Kick a user from the server.',
      LOCK_DESCRIPTION: 'Locks a channel for users with the default role.',

      // Category General command descriptions
      // Sub category Fun
      CUDDLE_DESCRIPTION: 'Cuddle people (with a cute anime gif).',
      HUG_DESCRIPTION: 'Hug people (with a cute anime gif).',
      KISS_DESCRIPTION: 'Kiss people (with a cute anime gif).',
      OWOIFY_DESCRIPTION: 'OwOify evewything UwU',
      PAT_DESCRIPTION: 'Pat people (with a cute anime gif).',
      SLAP_DESCRIPTION: 'Slap people (with a cute anime gif).',

      // Sub category Image'
      ANIMEME_DESCRIPTION: 'Get a random animeme.',
      BOOBS_DESCRIPTION: 'Anime boobs (NSFW channel only).',
      DANKMEME_DESCRIPTION: 'Get a random dank meme.',
      EMOJI_DESCRIPTION: 'Display a custom emoji in full size.',
      FOXGIRL_DESCRIPTION: 'Display a cute fox girl (NSFW channel only).',
      KIDOL_DESCRIPTION: 'Display an idol from a random K-Pop group.',
      NEKO_DESCRIPTION: 'Display a cute and lewd cat girl (NSFW channel only).',
      SAUCE_DESCRIPTION: 'Trying to find the source of an anime, manga or hentai image link.',

      // Sub category Information
      EIGHTBALL_DESCRIPTION: 'Get wise answers for yes or no questions.',
      ANIME_DESCRIPTION: 'Get information about a specific anime.',
      CHUCKNORRIS_DESCRIPTION: 'Get a Chuck Norris joke.',
      DONALD_DESCRIPTION: 'Get intellectual quotes from the POTUS.',
      FACT_DESCRIPTION: 'Get random facts.',
      LMGTFY_DESCRIPTION: 'Sometimes searching on the internet is hard.',
      URBANDICTIONARY_DESCRIPTION: 'Get a definition from the urban dictionary.',
      WHOIS_DESCRIPTION: 'Get information about a discord user.',
      NUMBER_DESCRIPTION: 'Converts the magic 6-digit numbers into full degeneracy.',

      // Sub category Voice
      LOOP_DESCRIPTION: 'Turn on/off the loop of the currently playing track.',
      NOWPLAYING_DESCRIPTION: 'Show information about the currently playing track.',
      PAUSE_DESCRIPTION: 'Pause / resume the song playback.',
      PLAY_DESCRIPTION: 'Play a song from youtube.',
      QUEUE_DESCRIPTION: 'Show the current queue of the current session.',
      RESUME_DESCRIPTION: 'Resume the song playback.',
      SKIP_DESCRIPTION: 'Skip the currently playing track.',
      STOP_DESCRIPTION: 'Stop the current session and flush the queue.',
      VOLUME_DESCRIPTION: 'Adjust the playback volume. (Limit 1-200 %)',
    };
  }

  async init() {
    await super.init();
  }
};
