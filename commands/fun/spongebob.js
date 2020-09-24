const {
    Command
} = require('discord.js-commando');
const config = require('../../config.json')
var fs = require('fs');

module.exports = class SpongebobCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'spongebob',
            aliases: ['spongebob', 'mock'],
            group: 'fun',
            memberName: 'spongebob',
            description: 'tHiS iS a deSCRipTioN',
            examples: [`${config.prefix} spongebob "put text here"`],
                args: [{
                    key: 'text',
                    prompt: 'Type the text you want to spongeify.',
                    type: 'string',
                }]
        });
    }

    async run(msg, args) {
        let spongeify = "";
        for (let i = 0; i < args.text.length; i++) {
            let rnd = Math.floor(Math.random() * Math.floor(2));
            if (rnd == 0) {
                spongeify += args.text.charAt(i).toUpperCase();
            } else if (rnd == 1) {
                spongeify += args.text.charAt(i).toLowerCase();
            }
        }
        msg.say(spongeify);
    }
};