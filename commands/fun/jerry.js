/* Initial imports, do not remove these. You can add
   more as you wish. */
const {
    Command
} = require('discord.js-commando');
const config = require('../../config.json')
var fs = require('fs');

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
            name: 'jerry',
            aliases: ['jerrymeme','jerrymemes','jdog','jungleman'],
            group: 'fun',
            memberName: 'jerry',
            description: 'Some may call him Jerry, others may call him JRTWCA. But me? I call him Party Mom.',
            throttling: {
                usages: 3,
                duration: 20
            }
        });
    }

    async run(msg, args) {
        // Makes the bot talk, returns whatever firstArg is back.
        //return msg.say(args.firstArg);
        var files = fs.readdirSync('assets/fun/jerry/')
        let chosenFile = files[Math.floor(Math.random() * files.length)]
        //Hello World!
        return msg.say("Here's your fresh Jerry Meme.", {
            files: ['assets/fun/jerry/' + chosenFile]
        });
    }
};