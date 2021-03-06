const {
    Command
} = require('discord.js-commando');
const config = require('../../config.json')

module.exports = class CopyCommand extends Command {
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
            .then(message => msg.client.channels.cache.get(args.dest).send(message.content))
            .catch(console.error);
    }
};