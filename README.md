# Filo 
A cute, multipurpose Discord bot for all your kawaii needs.

### Invite Filo to your Guild
[Click here](https://discordapp.com/oauth2/authorize?client_id=475708736908820482&permissions=268725328&scope=bot) to invite Filo to your guild!

### Contributions
Filo is an amazing bot, but just like all things in life, she can be improved! 

As long as they follow [Linter](https://en.wikipedia.org/wiki/Lint_(software)) rules, pull requests that add new features, fix insanely bad written code, or make things look fancier are very appreciated and I'm more than welcome to help you merge your pull request into Filo.

If you have questions about Filo or encounter any issues with her, you can join [Filo's Discord Server](https://discord.gg/jmt2fTp) for support.  

## Supported Commands
Filo's commands are separated by 4 categories, which are __General Commands, Information Commands, User Command, and Music Commands.__ 
In order to use these commands, you must first type Filo's prefix, which by default is `!`. This can be changed to anything else by the user if nessesary.  

### General Commands
- `help/help [Command]`: Display a messages with all the available commands. It can also provide help by displaying options for a certain command.
- `info`: Provides useful information to the user about Klasa. 
- `ping`: Runs a connection test on Discord. 
- `stats`: Provides information about the server and/or the bot.

### Information Commands
- `avatar`: Obtains your profile picture and posts it on whichever chat the user is in. 
- `anime [Anime name]` : Provides usful information about recent anime release. It can also provide information about a specified anime. (Powered by [AniList](https://anilist.co)) 
- `fact`: Shows the user a random fact about anything. (Powered by [nekos.life](https://nekos.life))
- `chucknorris`: Shows the user a random fact about Chuck Norris (Powered by [api.chucknorris.io](https://api.chucknorris.io))
- `google`: Provides useful information on how easy it is to ufse Google (Powered by [lmgtfy](https://lmgtfy.com))
- `donald`: Provides intellectual quotes from the POTUS. (Powered by [tronalddump.io](https://www.tronalddump.io))
- `define [word]`: Provides useful information about the specified word (Powered by [Urban Dictionary](https://www.urbandictionary.com))

### User Commands
- `hug [user]`: Allows users to vitually hug the specified user.
- `kiss [user]`: Allows users to virtually kiss the specified ulser. 
- `pat [user]`: Allows users to vitually pat the specified user. 
- `cuddle [user]`: Allows users to virtually cuddle the specified user. 
- `slap [user]`: Allows users to virtually slap the specfied user. 
- `owify [text]`: Provides the user with an specified text having "owo's" throughout phrases.
- `8ball`: Provides the user answers for yes/no questions. 

### Music Commands
- `loop`: Turn on/off the loop of the currently playing track.
- `nowplaying`: Show information about the currently playing track.
- `pause`: Pause / resume the song playback.
- `play`: Play a song from youtube.
- `queue`: Show the current queue of the current session.
- `resume`: Resume the song playback.
- `skip`: Skip the currently playing track.
- `stop`: Stop the current session and flush the queue.
- `volume`: Adjust the playback volume. (Limit: 1% - 200%)

## Implementation
Implementing Filo into your Discord server is easy to do. Before you start, here are things you will need: 

- node.js
  - discord.js
  - klasa
  - node.fetch
- git (Optional) 
- A Discord account (of course!)

discord.js, klasa, and node.fetch can easily be downloaded and installed by running `npm i` on the root of the project. 

### Installation
1. Download the master branch of Filo from [here](https://github.com/Emy/filo/archive/master.zip), or use Git in order to clone this repository
```
git clone https://github.com/Emy/filo.git
```
2. Create a new application at [Discord Developers](https://discordapp.com/developers/)
3. Create a bot inside said application and copy your bot token
4. Add your given bot token to the `config.json` file in the "discordToken" field and your Discord tag on the "ownerID" field
5. Run `node index.js` in the root of the project to start Filo

### Adding the bot to your Discord Server
Now that you have set up Filo, you can add her to your Discord server in 2 steps

1. Find the client ID of your app from [Discord Developers](https://discordapp.com/developers/)
2. Open the following URL in your browser, and replace CLIENTID with your client ID:\
`https://discordapp.com/oauth2/authorize?client_id=CLIENTID&scope=bot&permissions=0`
