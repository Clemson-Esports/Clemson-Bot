# Clemson-Bot
The Discord bot for the Clemson Esports Discord. The goal is to have commands for different games as well as Clemson related commands. For more information for contributing, contact `Zerukai#4327` on Discord or keep on reading below!

If you end up deciding you want to contribute, after your first approved Pull Request, you'll get a special `@Bot Developer` role in the Clemson Esports server!
<hr>

Contributing and Development
============================
This is a quick guide on how to develop and contribute to this project!
*Thank you to the [Clemson CPSC Discord Bot Devs](https://github.com/ClemsonCPSC-Discord/ClemBot) for letting us use their contributing guide!*

## 1. Dependencies
Make sure that you have [node](https://nodejs.org/en/download/) installed. 
You can check to make sure it's installed by running either of the following commands via command line...

* `npm --version` - Node Package Manager, included with Node.js
* `node --version` - from Node.js 
  * We are writing this on `Node v12.13.0` or higher, any versions lower than this may cause errors.

If these commands don't give you an error, then you can continue to the next step.

## 2. Get a Discord Bot Token

* Go to the [Discord Developer Portal](https://discordapp.com/developers/applications)
  * Log in with your Discord account information
* Create an Application
  * `New Application` button in the top right corner
  * The name of your bot will show up as what you name it here
* Click `Bot` on the left sidebar
* Click `Add Bot` and confirm
* Make note of the token on this page


## 3. Create a Test Server

* In Discord, on the left sidebar, click the plus icon and create a new Discord Server.
* Name it something memorable, like "Bot Testing Server".
  * This is YOUR own private server to test the bot on. You have full power over your own bot here, so do as you please.


## 4. Prepare Bot for Connecting to the Test Server

* Click `OAuth2` in the left sidebar
* In the `SCOPES` section, check `bot`
* In the `BOT PERMISSIONS` section, check `Administrator`
  * Typically you only want to give your bot the least permissions it needs to operate, but since this is only a test server you are inviting it to, Administrator is fine. Do NOT add the bot to any public servers with Administrator permissions unless you know what you are doing.
* Copy the link from the `SCOPES` section and open in a new tab/window
* Select the test server that you made in step 3, and add your bot
* Check to see if your bot is in the serverlist
<center><img src="https://i.imgur.com/fUKmCG2.png" width="60%"></center>

## 5. Preparing the Repository

* Fork this repository
* `git clone` your fork to wherever you want to work on this bot
* Rename `config.json.template` to `config.json` and fill out the values inside
  * `token` is what you created in part 2
  * `prefix` is the prefix for each of your commands. 
    * Ex: `cu!` ➡ `cu! <command>`
  * `owner` is your Discord ID. Find it [here](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-).


## 6. Setting up the Build Environment

Download all of the required node packages:

* `npm install`

You can then test-run the bot with the command:  

* `node bot.js`

when you are in the root directory `\Clemson-Bot`

## 7. Developing and Testing your first Command

Navigate to the `Clemson-Bot/commands/templates/` directory and find the `templateCommand.js` file.
This file gives you a template of how you can create a command, simply edit and add to it to create your own command.
You can find examples of other commands already written in the `Clemson-Bot/commands/*` folders.

The bot should show up in the test server and respond to commands (test with `<your_prefix><command>`)

* Ex: `cu! templateCommand` will have the bot return back `Hello World!`

<hr>

<center>

#### 🐯 Join Clemson Esports! 🐯
[![Discord Chat](https://discord.com/api/guilds/215845807801237514/embed.png?style=banner2)](https://discord.com/invite/clemson)

</center>