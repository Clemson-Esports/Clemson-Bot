/* Initial imports, do not remove these. You can add
   more as you wish. */
const {
    Command
} = require('discord.js-commando');
const config = require('../../config.json')
var fs = require('fs');

/* This is the templateCommand command.
   You can copy this file into your folder and replace it to make a new
   command from scratch. You will need to change the class name and
   file name, as well as the template strings in the file to suit
   what your command needs. To see what all is available to you,
   read the documentation below. 
   https: //discord.js.org/#/docs/commando/master/general/welcome */
module.exports = class TemplateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sus',
            aliases: ['imposter', 'suspicious'],
            group: 'fun',
            memberName: 'sus',
            description: 'It\'s \<redacted\>! They\'re the killer!',
            throttling: {
                usages: 1,
                duration: 60
            }
        });
    }

    async run(msg, args) {
        // Makes the bot talk, returns whatever firstArg is back.
        //return msg.say(args.firstArg);
        let quotes = [
            "I just saw you walk from Med Bay and I go in and there's a body there.",
            "Only person who didn't do the common task.",
            "So uhh, you wanna explain why we all buddied up and your partner is the only one dead?",
            "I saw this on a DisguisedToast stream once, he put out lights and vented in and out he does it every time.",
            "Not really sus but they killed me last game and I'm still afraid of them because of it.",
            "Obvious self report the rest of us are all together LOL.",
            "Oh you're a crewmate? Name every task.",
            "Okay if it's not this guy then you can vote me off I promise.",
            "Idunnobroyouseemkindasus",
            "Could have killed me but didn't, but it was probably just their cooldown.",
            "Said they did vending machine. There is no vending machine on this map.",
            "Smells like cheese.",
            "Keeps saying \"literally\" every other word when accused.",
            "Bad.",
            "Not actually sus but I don't like playing with this person they... tryhard too much.",
            "Don't like the color they picked.",
            "Forgot to mute, I could hear them spamclicking the kill button.",
            "Yo usually this person is the first to die and this round they're still alive what's up with that?",
            "In loving memory, Blue.",
            "idk lmao",
            "I was on security, easiest vote of my life."

        ]
        var files = fs.readdirSync('assets/fun/sus/')
        let chosenFile = files[Math.floor(Math.random() * files.length)]
        let susPercentage = Math.floor(Math.random() * (100 - 0 + 1) + 0);
        let chooseQuote = Math.floor(Math.random() * (quotes.length - 0 + 1) + 0);
        return msg.say(`${susPercentage}% Sus: ${quotes[chooseQuote]}`, {
            files: ['assets/fun/sus/' + chosenFile]
        });
    }
};