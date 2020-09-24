const {
    Command
} = require('discord.js-commando');
const config = require('../../config.json')

module.exports = class DiscordCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'discord',
            group: 'utility',
            memberName: 'discord',
            description: 'Sends a Discord Link, defaults to Clemson Esports Discord',
            throttling: { //Throttles the command so you can only use it 1 time every 30 seconds.
                usages: 1,
                duration: 60
            },
            examples: [`${config.prefix} discord`]
        });
    }

    async run(msg, args) {
        msg.delete();
        let discordLink = "https://discord.gg/clemson"
        let serverName = "Clemson Esports"
        return msg.say(`:star: Click here to join the ${serverName} community! ${discordLink} :star:`);
    }
};