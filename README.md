# Emybot

  A cute discord bot for all your nekomimi needs.

## Getting started

### Prerequisites

  - node.js

  - discord.js: `npm install discord.js`

  - klasa: `npm install klasa`

  - node-fetch: `npm install node-fetch`

  - git

  - Discord account.

### Installation

  - Clone the github repo of Emybot: `git clone https://github.com/Emxix/emybot`

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
