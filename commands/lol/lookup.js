const { Command } = require('discord.js-commando');
const https = require('https');
const config = require('../../config.json');

/* This is the lookup command. It lets someone get basic information
 * about a League of Legends summoner.
 */
module.exports = class LookupCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lookup',
            aliases: ['lu', 'summoner'],
            group: 'lol',
            memberName: 'lookup',
            description: 'Look up a summoner with the username. Usage: `cu! lookup <SummonerName>`',
            args: [{
                key: 'name',
                prompt: 'Which summoner do you want to look up?',
                type: 'string'
            }]
        });
    }

    run(message, args) {
        https.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${args.name}?api_key=${config.riotapikey}`, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                message.say(JSON.stringify(data));
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
};


