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
            examples: [`${config.prefix} inhouses firstArg`],
            args: [{
                key: 'inhousesTitle',
                prompt: 'What game or event is this inhouse for?',
                type: 'string',
            },
            {
                key: 'teamSize',
                    prompt: 'How many people will be on each team?',
                    type: 'integer',
            }]
        });
    }

    async run(msg, args) {
        /* Top is gotten by typing \:emoji_name: 
           Bottom is the snowflake. */
        let reactionEmojiString = '<:paw:739673498481328129>'
        let reactionEmoji = '739673498481328129'

        /* Embed message */
        const embed = new Discord.MessageEmbed()
            .setColor('#F56600')
            .setTitle(`🐯 ${args.inhousesTitle} Inhouses 🐯`)
            .setDescription(`React to this message with a ${reactionEmojiString} to be put into the random team generation!`)
            .setThumbnail('https://www.clemson.edu/brand/resources/logos/paw/orange.png')
            .setTimestamp();

        /* Send the message and start the reaction to it! */
        msg.say(embed).then(sentEmbed => {
            sentEmbed.react(reactionEmoji);
        });
    }
};