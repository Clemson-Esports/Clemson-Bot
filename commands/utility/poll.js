const {
    Command
} = require('discord.js-commando');
const {
    RichEmbed
} = require('discord.js');
const Discord = require("discord.js")
const config = require('../../config.json')
const oneLine = require('common-tags').oneLine;

module.exports = class PollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'poll',
            group: 'utility',
            memberName: 'poll',
            description: 'Creates a poll with up to 10 choices.',
            examples: [`${config.prefix} "What is your favorite game?" "LoL; Rocket League; Minecraft" 10`],
            args: [{
                    key: 'question',
                    prompt: 'What is the poll question?',
                    type: 'string',
                    validate: question => {
                        if (question.length < 101 && question.length > 11) return true;
                        return 'Polling questions must be between 10 and 100 characters in length.';
                    }
                },
                {
                    key: 'options',
                    prompt: 'What options do you want for the poll? Enter your options separated with semicolons, like this:\n\`option 1; option 2; option 3\`',
                    type: 'string',
                    validate: options => {
                        var optionsList = options.split(";");
                        if (optionsList.length > 1) return true;
                        return 'Polling options must be greater than one.';
                    }
                },
                {
                    key: 'mins',
                    prompt: 'How long should the poll last in minutes? Enter 0 if the poll should not end after a specified time.',
                    type: 'integer',
                    validate: mins => {
                        if (mins >= 0 && mins <= 1440) return true;
                        return 'Polling time must be between 0 and 1440 (24 hours).';
                    }
                }]
        });
    }

    async run(msg, {question, options, mins}) {

        var emojiList = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟'];
        var optionsList = options.split(";");
        var optionsText = "";

        for (var i = 0; i < optionsList.length; i++) {
            optionsText += emojiList[i] + " " + optionsList[i] + "\n";
        }

        const filter = (reaction, user) => {
            return( reaction.emoji.name === '1⃣' ||
                    reaction.emoji.name === '2⃣' ||
                    reaction.emoji.name === '3⃣' ||
                    reaction.emoji.name === '4⃣' ||
                    reaction.emoji.name === '5⃣' ||
                    reaction.emoji.name === '6⃣' ||
                    reaction.emoji.name === '7⃣' ||
                    reaction.emoji.name === '8⃣' ||
                    reaction.emoji.name === '9⃣' ||
                    reaction.emoji.name === '🔟' &&
                    user.id === msg.author.id);
        };

        var embed = new Discord.MessageEmbed()
            .setTitle(`Poll: ${question}`)
            .setDescription(optionsText)
            .setColor('#F56600') 
            .setThumbnail(msg.author.displayAvatarURL())
            .setTimestamp();
        if (mins) {
            var currDate = new Date();
            var newDate = new Date(currDate.getTime() + mins * 60 * 1000);
            embed.setFooter(`The poll has started and will end at ${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`);
        } else {
            embed.setFooter(`The poll has started and has no end time`);
        }

        msg.delete(); // Remove the user's command message

        msg.say(embed).then(sentEmbed => {
            var reactionArray = [];
            for (var i = 0; i < optionsList.length; i++) {
                reactionArray[i] = sentEmbed.react(emojiList[i]);
            }
            sentEmbed.awaitReactions(filter, {time: 1000 * 60 * mins}).then(async collected => {
                if (mins && collected) {
                    let reactionCountsArray = [];
                    for (var i = 0; i < optionsList.length; i++) {
                        reactionCountsArray[i] = collected.get(emojiList[i]).count - 1;
                    }

                    // Tally up votes, find winner
                    var max = -Infinity, indexMax = [];
                    for (var i = 0; i < reactionCountsArray.length; ++i) {
                        if (reactionCountsArray[i] > max)
                            max = reactionCountsArray[i], indexMax = [i];
                        else if (reactionCountsArray[i] === max)
                            indexMax.push(i);
                    }
                    
                    // Display winners
                    var winnersText = "";
                    if (reactionCountsArray[indexMax[0]] == 0) {
                        winnersText = "Nobody voted!"
                    } else {
                        for (var i = 0; i < indexMax.length; i++) {
                            winnersText +=
                                emojiList[indexMax[i]] + " " + optionsList[indexMax[i]] +
                                " (" + reactionCountsArray[indexMax[i]] + " vote(s))\n";
                        }
                    }

                    embed.addField("**Winner(s):**", winnersText);
                    embed.setFooter(`The poll is now closed! It lasted ${mins} minute(s)`);
                    embed.setTimestamp();

                    sentEmbed.edit("", embed);
                }
            }).catch(collected => {
                console.log(collected);
            });    
        })
    }
};