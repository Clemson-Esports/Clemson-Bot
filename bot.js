const config = require('./config.json')
const path = require('path');
const {
    CommandoClient
} = require('discord.js-commando');
const client = new CommandoClient({
    commandPrefix: config.prefix,
    owner: config.owner
});

client
    .on('error', console.error)
    .on('warn', console.warn)
    .on('debug', console.log)
    .on('ready', () => {
        console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
        client.user.setActivity(`[${config.prefix} help]`, {
            type: 'PLAYING'
        })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);
    })
    .on('disconnect', () => {
        console.warn('Disconnected!');
    })
    .on('reconnecting', () => {
        console.warn('Reconnecting...');
    })
    .on('commandError', (cmd, err) => {
        console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
    })
    .on('commandBlocked', (msg, reason) => {
        console.log(oneLine `
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
    })
    .on('commandPrefixChange', (guild, prefix) => {
        console.log(oneLine `
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
    })
    .on('commandStatusChange', (guild, command, enabled) => {
        console.log(oneLine `
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
    })
    .on('groupStatusChange', (guild, group, enabled) => {
        console.log(oneLine `
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
    })
    .on("presenceUpdate", function(oldPresence, newPresence){
        // 755555057134731415 754574527341658172
        streaming_role = newPresence.guild.roles.cache.find(role => role.name === 'CURRENTLY STREAMING')
        clemson_role = newPresence.guild.roles.cache.find(role => role.name === 'Clemson')
        // check if server has the role
        if (streaming_role && clemson_role) {
            // make sure user status/activities is not empty array
            if (newPresence.activities.length !== 0) {
                // check for streaming status
                if (newPresence.activities[0].name === 'Twitch' && newPresence.activities[0].type === 'STREAMING') {
                    newPresence.guild.members.fetch(newPresence.userID)
                    .then(user => {
                        // make sure user has clemson role
                        if (user.roles.cache.has(clemson_role.id)) {
                            user.roles.add(streaming_role)
                            .catch(err => {
                                if (err.code === 'INVALID_TYPE') {
                                    console.log(`${user.displayName} already has streaming role`)
                                }
                                else {
                                    console.log(err)
                                }
                            });
                        }
                    })
                }
                // when user turn off stream but keep game on
                else if (newPresence.activities[0].name !== 'Twitch' && newPresence.activities[0].type !== 'STREAMING') {
                    newPresence.guild.members.fetch(newPresence.userID)
                    .then(user => {
                        if (user.roles.cache.has(streaming_role.id)) {
                            user.roles.remove(streaming_role)
                            .catch(err => {
                                if (err.code === 'INVALID_TYPE') {
                                    console.log(`${user.displayName}'s role already removed`)
                                }
                                else {
                                    console.log(err)
                                }
                            });
                        }
                    })
                }
            }
            else {
                // when user turn off stream and game
                newPresence.guild.members.fetch(newPresence.userID)
                .then(user => {
                    if (user.roles.cache.has(streaming_role.id)) {
                        user.roles.remove(streaming_role)
                        .catch(err => {
                            if (err.code === 'INVALID_TYPE') {
                                console.log(`${user.displayName}'s role already removed`)
                            }
                            else {
                                console.log(err)
                            }
                        });
                    }
                })
            }
        }
    });

// To add a new command group just add a new entry in the registerGroups call
client.registry
    .registerGroups([
        ['utility', 'Moderation and Utility commands'],
        ['clemson', 'Commands that relate to Clemson!'],
        ['esports', 'Esports related commands'],
        ['fun', 'Some random stuff, just for fun!'],
        ['lol', 'League of Legends'],
        ['mc', 'Minecraft'],
        ['misc', 'Miscellaneous commands'],
        ['templates', 'For testing/dev team'],
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(config.token);