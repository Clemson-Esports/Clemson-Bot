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
                key: 'channelToSet',
                prompt: 'Copy the ID from the channel where the message you are **EDITING** is.',
                type: 'string',
            },{
                key: 'msgToSet',
                prompt: 'Copy the ID of the message you would like to **EDIT**.',
                type: 'string',
            },{
                key: 'channelToGet',
                prompt: 'Copy the ID from the channel where the message you are **COPYING** is.',
                type: 'string',
            },{
                key: 'msgToGet',
                prompt: 'Copy the ID of the message you would like to **COPY**.',
                type: 'string',
            }]
        });
    }

    async run(msg, args) {
        let copy;
        msg.client.channels.cache.get(args.channelToSet).messages.fetch(args.msgToSet)
            .then(message => {
                copy = message;
                msg.client.channels.cache.get(args.channelToGet).messages.fetch(args.msgToGet)
                .then(source => copy.edit(source.content))
                .catch(console.log);
            }).catch(console.log);
    }
};