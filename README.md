# Clemson-Bot
The Discord bot for the Clemson Esports Discord. The goal is to have commands for different games as well as Clemson related commands. For more information for contributing, contact Zerukai#4327 on Discord!
<hr>

Contributing and Development
============================
This is a quick guide on how to develop and contribute to this project!

## 1. Dependencies
Make sure you can run these commands and install them if not present.
* npm - Node Package Manager, included with Node.js
* [node](https://nodejs.org/en/download/) from Node.js


## 2. Get a Discord bot token
* Go to https://discordapp.com/developers/applications
    * Log in if needed
* Create an Application
    * Your bot's name will show up as what you name it here.
* Click "Bot" on the left sidebar
* Click "Add Bot" and confirm
* Make note of the token on this page (later refered to as BotToken)


## 3. Join the Test Server
[Click here to join the server](https://discord.gg/3GkAQEC)
ping @Zerukai#4327 for permissions to add bots


## 4. Prepare bot for connecting to discord server
* Click "OAuth2" in the left sidebar
* In the "scopes" section, check `bot`
* In the "bot permissions" section, check the following boxes [![perms](https://i.postimg.cc/NFkdvDCY/perms.png)](https://postimg.cc/xNqvKvSF)
* Copy the link from the "scopes" section and open in a new tab/window
* Select the test server to add the bot to

## 5. Prepare the Repo
* Fork this repo
* `git clone` your fork to wherever you want to work on this bot
* Copy `BotSecrets.json.template` and rename that copy to `BotSecrets.json`
* Copy/paste the token from the Discord page into the `BotToken` empty string
* Create a database name (Whatever you want it doesnt matter)
* Set a custom bot prefix that will invoke your commands 


## 6. Setting up the build environment
Setup a virtual environment:  
`pip3 install virtualenv` windows: `py -m pip install --user virtualenv`

`virtualenv venv`  windows: `py -m venv env`

Enter the virtualenv with:  
`source venv/bin/activate` windows: `source .\env\Scripts\activate`

Then allow pip to get the latest libraries:  
`pip3 install -r requirements.txt` windows: `py -m pip install -r requirements.txt`

You can then test-run the bot with the command:  
`python3 -m bot`  windows: `py -m bot`
when you are in the root directory `ClemBot/`

The bot should show up in the test server and respond to commands (test with `<your_prefix>hello`)

<hr>

# Our Links
<center>

🐯 Join Clemson Esports! 🐯
[![Discord Chat](https://discord.com/api/guilds/215845807801237514/embed.png?style=banner2)](https://discord.com/invite/clemson)

</center>