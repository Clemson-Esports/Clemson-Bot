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
            name: 'copymessage',
            aliases: ['cp', 'copy', 'cm'],
            group: 'utility',
            memberName: 'copymessage',
            description: 'Copies the message exactly, used for announcements and official channels.',
            userPermissions: ['ADMINISTRATOR'],
            examples: [`${config.prefix} copymessage sourceChannelID messageID destinationChannelID`],
            args: [{
                key: 'source',
                prompt: 'Copy the ID from the **SOURCE** channel where the message you are **COPYING FROM** is.',
                type: 'string',
            },{
                key: 'msgID',
                prompt: 'Copy the ID of the message you would like to copy.',
                type: 'string',
            },{
                key: 'dest',
                prompt: 'Copy the ID from the **DESTINATION** channel where the message you are **COPYING TO** is.',
                type: 'string',
            }]
        });
    }

    async run(msg, args) {
        msg.client.channels.fetch(args.source)
            .then(srcChannel => srcChannel.messages.fetch(args.msgID))
                .then(message => msg.client.channels.cache.get(args.dest).send(message))
            .catch(console.error);
    }
};