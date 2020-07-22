const config = require('./config.json')
const Discord = require('discord.js');
const {
    CommandoClient
} = require('discord.js-commando');
const path = require('path');
const client = new CommandoClient({
    commandPrefix: config.prefix,
    owner: config.owner
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['utility', 'Moderation and Utility commands'],
        ['fun', 'Some random stuff, just for fun!'],
        ['lol', 'League of Legends'],
        ['misc', 'Miscellaneous commands']
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('Clemson Football', {
            type: 'WATCHING'
        })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);
});

client.on('error', console.error);
client.login(config.token);