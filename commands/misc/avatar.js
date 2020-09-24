const { Command } = require('discord.js-commando');
const config = require('../../config.json')

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: ['av', 'pfp'],
            group: 'misc',
            memberName: 'avatar',
            description: 'Get the user\'s avatar.',
            throttling: { //Throttles the command so you can only use it 1 time every 30 seconds.
                usages: 1,
                duration: 30
            },
            examples: [`${config.prefix} avatar firstArg`],
            // args: [{
            //     key: 'firstArg',
            //     prompt: 'This is the first argument, you can access it with args.firstArg in the run function.',
            //     type: 'string',
            // }]
        });
    }

    async run(msg, args) {
        //TODO: add tagging of other users
        return msg.say(msg.author.displayAvatarURL());
    }
};