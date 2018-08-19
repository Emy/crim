# Emybot

  A cute discord bot for all your nekomimi needs.

## Getting started

### Prerequisites

  - node.js\
        Dependencies can be installed by running `npm i` in the root of the project

        * discord.js
        * klasa
        * node-fetch

  - git (Optional)
  - Discord account.

### Installation

  - Download the files
        * Option 1: Clone the github repo of Emybot: `git clone https://github.com/Emxix/emybot`
        * Option 2: Download the master branch from [here](https://github.com/Emdix/emybot/archive/master.zip).
  - Create a new application at [Discord Developers](https://discordapp.com/developers/).
  - Create a new bot inside that application and copy its bot token
  - Add that bot token into the "config.json" file in the field "discordToken".
  - Add your username to the "config.json" file in the field "ownerID".


### Running the Bot

  Run `node index.js` in the root of the project.

### Adding the bot to a server
<!---
  TODO: Describe a better option
  There has to be a better/easier/normal way to do this than this.
-->

  Copy the client ID of your application on [Discord Developers](https://discordapp.com/developers/).

  Open the following URL in your browser, and replace CLIENTID with your client ID

  `https://discordapp.com/oauth2/authorize?client_id=CLIENTID&scope=bot&permissions=0` 

  You can now choose which server you want your bot to be on.

## Supported Commands

### General Commands

  - !help / !help [COMMAND]\
    Displays help / Displays help for a command

  - !info\
    Shows some information about Klasa

  - !ping\
    Runs a connection test to Discord

  - !stats\
    Displays statistics about the bot

### Utility Command

  - !avatar\
    Posting your avatar in chat as an embedded message

### Information Commands

  - !anime\
    Gets anime informations from anilist.co 

  - !fact\
    Shows you a random fact. Powered by nekos.life

  - !chucknorris\
    Shows you a random chuck norris fact. Powered by api.chucknorris.io

  - !lmgtfy\
    For the times where someone needs to learn how to use google.

### Fun Commands

  - !hug [@USER]\
    Hug people

  - !kiss [@USER]\
    Kiss people

  - !pat [@USER]\
    Pat people

  - !owoify [TEXT]\
    OwOifys your text
