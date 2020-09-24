const {
    Command
} = require('discord.js-commando');
const Discord = require("discord.js")
const config = require('../../config.json')

module.exports = class VibeCheckCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'vibecheck',
            aliases: ['vibes'],
            group: 'fun',
            memberName: 'vibecheck',
            description: 'Check the vibes of the local gang.',
            throttling: { 
                usages: 1,
                duration: 43200 //12 hour cooldown
            },
            examples: [`${config.prefix} vibecheck`],
        });
    }

    async run(msg, args) {
        let tUp = '👍'
        let tDown = '👎'
        msg.delete();
        const embed = new Discord.MessageEmbed()
            .setColor('#F56600')
            .setTitle(`Vibe Check`)
            .setDescription(`Are you vibin' right now? Rate your vibes with a :thumbsup: or :thumbsdown:.\n
                            We're all lookin' out for each other here. :sunglasses:`)
            .setThumbnail(msg.author.displayAvatarURL())
            .setTimestamp();

        msg.say(embed).then(sentEmbed => {
            sentEmbed.react(tUp);
            sentEmbed.react(tDown);            
        });
    }
}