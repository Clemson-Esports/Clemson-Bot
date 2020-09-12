const {
    Command
} = require('discord.js-commando');
const config = require('../../config.json')

module.exports = class NoCottageCheeseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cottagecheese',
            aliases: ['cc'],
            group: 'fun',
            memberName: 'cottagecheese',
            description: 'Cottage Cheese.',
            throttling: {
                usages: 1,
                duration: 20
            }
            });
    }

    async run(msg) {
        return msg.say("No cottage cheese allowed.", {files: ['assets/fun/nocottagecheese.png']});
    }
};