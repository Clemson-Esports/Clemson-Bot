const {
    Command
} = require('discord.js-commando');
const config = require('../../config.json')
var fs = require('fs');

module.exports = class JerryCommand extends Command {
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
        var files = fs.readdirSync('assets/fun/jerry/')
        let chosenFile = files[Math.floor(Math.random() * files.length)]
        return msg.say("Here's your fresh Jerry Meme.", {
            files: ['assets/fun/jerry/' + chosenFile]
        });
    }
};