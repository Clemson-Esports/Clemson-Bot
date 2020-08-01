const commando = require('../../../src');
const config = require('./config.json')

/* This is the templateCommand command.
   You can copy this file into your folder and replace it to make a new
   command from scratch. You will need to change the class name and
   file name, as well as the template strings in the file to suit
   what your command needs. To see what all is available to you,
   read the documentation below. 
   https: //discord.js.org/#/docs/commando/master/general/welcome */
module.exports = class TemplateCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'templateCommand',
            aliases: ['template', 'temp'],
            group: 'templates',
            memberName: 'template',
            description: 'This is a template command. Change the things in this file to make your command.',
            examples: [`${config.prefix} templateCommand firstArg`],
            args: [{
                key: 'firstArg',
                prompt: 'This is the first argument, you can access it with args.firstArg in the run function.',
                type: 'string',
            }]
        });
    }

    async run(msg, args) {
        // Makes the bot talk, returns whatever firstArg is back.
        return msg.say(args.firstArg);
    }
};