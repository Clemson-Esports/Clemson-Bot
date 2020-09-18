const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const Discord = require("discord.js")
const client = new Discord.Client()

module.exports = class InhousesCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'inhouses',
            aliases: ['ih', 'inhouse'],
            group: 'utility',
            memberName: 'inhouses',
            description: 'Set up custom inhouse lobbies easily!',
            throttling: {
                usages: 1,
                duration: 15
            },
            examples: [`${config.prefix} inhouses 5 25 - Makes 2 teams of 5 after 25 seconds.`],
            args: [{
                key: 'teamSize',
                    prompt: 'How many people will be on each team?',
                    type: 'integer',
            },{
                key: 'seconds',
                prompt: 'How many seconds until the teams are generated?',
                type: 'integer',
            }]
        });
    }

    async run(msg, args) {
        /* Top is gotten by typing \:emoji_name: 
           Bottom is the snowflake. */
        let reactionEmojiString = '<:paw:739673498481328129>';
        let reactionEmoji = '739673498481328129';
        let numPlayers;
        let players = [];
        let playerids = [];
        let team1 = [];
        let team2 = [];


        /* Embed message */
        const embed = new Discord.MessageEmbed()
            .setColor('#F56600')
            .setTitle(`🐯 Clemson Esports Inhouses 🐯`)
            .setDescription(`:star: React to this message with a ${reactionEmojiString} to be put into the random team generation!\n\n:star: Generating [2] teams of [${args.teamSize}] player(s) after ${args.seconds} seconds pass.`)
            .setThumbnail('https://www.clemson.edu/brand/resources/logos/paw/orange.png')
            .setTimestamp();

        const filter = (reaction, user) => reaction.emoji.id === reactionEmoji && user.id === msg.author.id;

        /* Send the message and start the reaction to it! */
        msg.say(embed).then(sentEmbed => {
            sentEmbed.react(reactionEmoji);
            // wait for user reaction
            sentEmbed.awaitReactions(filter, {time: 1000 * args.seconds})
            .then(async collected => {
                // check if there is enough player for inhouse
                if (collected) {
                    numPlayers = collected.first().count - 1;
                    if (numPlayers < args.teamSize * 2) {
                        sentEmbed.say(`Not enough players, only ${numPlayers} user(s) signed up`)
                    }
                    else {
                        collected.first().users.cache.each(user => {
                            // make sure user is not bot
                            if (!user.bot) {
                                playerids.push(user.id);
                            }
                        })
                        // add player nickname
                        playerids.forEach(id => {
                            players.push(collected.first().message.guild.members.cache.find(member => member.id === id).nickname);
                        })
                        // assign players to teams
                        let temp;
                        for (let i=0; i < 2; i++) {
                            for (let j =0; j < args.teamSize; j++) {
                                temp = Math.floor(Math.random() * players.length);
                                if (i === 0) {
                                    team1[j] = players[temp];
                                    players.splice(temp, 1);
                                }
                                else {
                                    team2[j] = players[temp];
                                    players.splice(temp, 1);
                                }
                            }
                        }
                        // send team embed
                        let description = await formatPlayer(team1, team2);
                        sentEmbed.say(embed
                            .setDescription(description)
                            .setTimestamp());
                    }
                }
                else {
                    sentEmbed.say("Error: Collection was empty.")
                }
            })
            .catch(collected => {
                console.log(collected);
                sentEmbed.say("Nobody reacted to the message.")});
        });


    }
};

async function formatPlayer(team1, team2) {

    let str = '';

    str += '▬▬▬▬▬▬▬▬▬Team One▬▬▬▬▬▬▬▬▬\n';

    for (let i = 0; i < team1.length; i++) {
        str += ':small_blue_diamond:' + ' ' + team1[i] + '\n';
    }

    str += '▬▬▬▬▬▬▬▬▬Team Two▬▬▬▬▬▬▬▬▬\n';

    for (let i = 0; i < team2.length; i++) {
        str += ':small_red_triangle_down:' + ' ' + team2[i] + '\n';
    }
    
    str += '**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**';

    return str;
}