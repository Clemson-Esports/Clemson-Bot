const {
    Command
} = require('discord.js-commando');
const config = require('../../config.json')

module.exports = class PoggersCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'poggers',
            aliases: ['pog'],
            group: 'fun',
            memberName: 'poggers',
            description: 'Poggers!',
            throttling: {
                usages: 1,
                duration: 20
            }
        });
    }

    async run(msg) {
        msg.delete();
        return msg.say({
            files: ['assets/fun/poggers.png']
        });
    }
};