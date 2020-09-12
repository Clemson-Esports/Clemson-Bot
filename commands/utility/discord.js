/* Initial imports, do not remove these. You can add
   more as you wish. */
const {
    Command
} = require('discord.js-commando');
const config = require('../../config.json')

/* This is the templateCommand command.
   You can copy this file into your folder and replace it to make a new
   command from scratch. You will need to change the class name and
   file name, as well as the template strings in the file to suit
   what your command needs. To see what all is available to you,
   read the documentation below. 
   https: //discord.js.org/#/docs/commando/master/general/welcome */
module.exports = class TemplateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'discord',
            group: 'utility',
            memberName: 'discord',
            description: 'Sends a Discord Link, defaults to Clemson Esports Discord',
            throttling: { //Throttles the command so you can only use it 1 time every 30 seconds.
                usages: 1,
                duration: 60
            },
            examples: [`${config.prefix} discord`]
        });
    }

    async run(msg, args) {
        let discordLink = "https://discord.gg/clemson"
        let serverName = "Clemson Esports"
        return msg.say(`:star: Click here to join the ${serverName} community! ${discordLink} :star:`);
    }
};