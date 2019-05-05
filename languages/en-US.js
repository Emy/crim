const { Language, util } = require('klasa');

module.exports = class extends Language {
    constructor(...args) {
        super(...args, { enabled: true });

        Array.prototype.random = function () {
            return this[Math.floor((Math.random()*this.length))];
        }

        let cuteReaction = ['OwO', 'UwU', 'awoo', ':3', '^~^'];
        let angryReaction = ['>.>', '>.<', '>:(', 'baka!']

        this.language = {
            DEFAULT: (key) => ` has not been localized for en-US yet.`,
            DEFAULT_LANGUAGE: 'Default Language',

            COMMAND_INVITE: (repo) => [
				`To add ${this.client.user.username} to your discord guild:`,
				`<${this.client.invite}>`,
				util.codeBlock('', [
					'The above link is generated requesting the minimum permissions required to use every command currently.',
					'I know not all permissions are right for every guild, so don\'t be afraid to uncheck any of the boxes.',
					'If you try to use a command that requires more permissions than the bot is granted, it will let you know.'
				].join(' ')),
				`Please file an issue at ${repo} if you find any bugs.`
            ],

            FIELD_STATISTICS: 'Statistics',
            FIELD_MEMORY: 'Memory',
            FIELD_UPTIME: 'Uptime',
            FIELD_USERS: 'Users',
            FIELD_GUILDS: 'Guilds',
            FIELD_KLASA_VERSION: 'Klasa Version',
            FIELD_NODEJS_VERSION: 'Node.js Version',
            FIELD_DISCORDJS_VERSION: 'Discord.js Version',
            FIELD_DEVELOPER: 'Developer',
            FIELD_SOURCECODE: 'Source code',
            FIELD_CLICK_HERE: 'Click here!',

            EMOTE_CUDDLE: 'cuddling',
            EMOTE_HUG: 'hugging',
            EMOTE_KISS: 'kissing',
            EMOTE_PAT: 'patting',
            EMOTE_SLAP: 'slapping',

            FIELD_EMOTE_CUTE: (sender, activity, receiver) => `**${sender}** is ${activity} **${receiver}** ${cuteReaction.random()}`,
            FIELD_EMOTE_ANGRY: (sender, activity, receiver) => `**${sender}** is ${activity} **${receiver}** ${angryReaction.random()}`,


            FOOTER_REQUESTED_BY: (name) => `Requested by ${name}`,
            FOOTER_PROVIDED_BY: (service) => `Provided by ${service}`,
            FOOTER_REQUESTED_PROVIDED_BY: (name, service) => `Requested by ${name} | Provided by ${service}`,

            // Errors
            ERROR_NOT_IN_VC: `🛑 You aren't in a voice channel right now!`,
            ERROR_LAVALINK_NO_DATA: `🛑 I haven't received any data from the music server! Try again later.`,
            ERROR_LAVALINK_NO_MUSIC_RUNNING: `🛑 There is no music playing right now.`,
            ERROR_REST_REQUEST_FAILED: `🛑 I haven't received any data from the API. Try again later.`,

            // Category Admin command descriptions
            // Sub category General
            COMMAND_SERVERLIST_DESCRIPTION: 'Display the list of servers the bot has joined.',

            // Category General command descriptions
            // Sub category Fun
            COMMAND_CUDDLE_DESCRIPTION: 'Cuddle people (with a cute anime gif).',
            COMMAND_HUG_DESCRIPTION: 'Hug people (with a cute anime gif).',
            COMMAND_KISS_DESCRIPTION: 'Kiss people (with a cute anime gif).',
            COMMAND_OWOIFY_DESCRIPTION: 'OwOify evewything UwU',
            COMMAND_PAT_DESCRIPTION: 'Pat people (with a cute anime gif).',
            COMMAND_SLAP_DESCRIPTION: 'Slap people (with a cute anime gif).',

            // Sub category Image
            COMMAND_BOOBS_DESCRIPTION: 'Anime boobs (NSFW channel only).',
            COMMAND_EMOJI_DESCRIPTION: 'Display a custom emoji in full size.',
            COMMAND_FOXGIRL_DESCRIPTION: 'Display a cute fox girl (NSFW channel only).',
            COMMAND_NEKO_DESCRIPTION: 'Display a cute and lewd cat girl (NSFW channel only).',

            // Sub category Information
            COMMAND_8BALL_DESCRIPTION: 'Get wise answers for yes or no questions.',
            COMMAND_ANIME_DESCRIPTION: 'Get information about a specific anime. (provided by anilist.co)',
            COMMAND_CHUCKNORRIS_DESCRIPTION: 'Get a Chuck Norris joke. (provided by chucknorris.io)',
            COMMAND_DONALD_DESCRIPTION: 'Get intellectual quotes from the POTUS (provided by tronalddrump.io)',
            COMMAND_FACT_DESCRIPTION: 'Get random facts. (provided by nekos.life)',
            COMMAND_DONALD_DESCRIPTION: 'Get intellectual quotes from the POTUS (provided by tronalddrump.io)',
            COMMAND_LMGTFY_DESCRIPTION: 'Sometimes searching on the internet is hard.',
            COMMAND_URBANDICTIONARY_DESCRIPTION: 'Get a definition from the urban dictionary.',
            COMMAND_WHOIS_DESCRIPTION: 'Get information about a discord user.',

            // Sub category Voice
            COMMAND_LOOP_DESCRIPTION: 'Turn on/off the loop of the currently playing track.',
            COMMAND_NOWPLAYING_DESCRIPTION: 'Show information about the currently playing track.',
            COMMAND_PAUSE_DESCRIPTION: 'Pause / resume the song playback.',
            COMMAND_PLAY_DESCRIPTION: 'Play a song from youtube.',
            COMMAND_QUEUE_DESCRIPTION: 'Show the current queue of the current session.',
            COMMAND_RESUME_DESCRIPTION: 'Resume the song playback.',
            COMMAND_SKIP_DESCRIPTION: 'Skip the currently playing track.',
            COMMAND_STOP_DESCRIPTION: 'Stop the current session and flush the queue.',
            COMMAND_VOLUME_DESCRIPTION: 'Adjust the playback volume. (Limit 1-200 %)',
        };
    }

    async init() {
        await super.init();
    }

};
