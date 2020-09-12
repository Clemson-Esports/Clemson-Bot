const {
    Command
} = require('discord.js-commando');
const config = require('../../config.json')

module.exports = class EditCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'editmessage',
            aliases: ['ed', 'edit'],
            group: 'utility',
            memberName: 'editmessage',
            description: 'Edit a message the bot has sent previously.',
            examples: [`${config.prefix} editmessage copyToChannel msgToEdit srcChannel msgToCopy`],
            args: [{
                key: 'copyToChannel',
                prompt: 'Copy the ID from the channel where the message you are **EDITING** is.',
                type: 'string',
            },{
                key: 'msgToEdit',
                prompt: 'Copy the ID of the message you would like to **EDIT**.',
                type: 'string',
            },{
                key: 'srcChannel',
                prompt: 'Copy the ID from the channel where the message you are **COPYING** is.',
                type: 'string',
            },{
                key: 'msgToCopy',
                prompt: 'Copy the ID of the message you would like to **COPY**.',
                type: 'string',
            }]
        });
    }

    async run(msg, args) {

    }
};

