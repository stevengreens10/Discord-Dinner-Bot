const commando = require('discord.js-commando');
const dinnerutil = require('../../util/dinnerutil.js');

class RerollCommand extends commando.Command{

    constructor(client) {
        super(client, {
            name: 'reroll',
            group: 'dinner',
            memberName: 'reroll',
            description: 'Picks a random location to eat dinner at'
        });
    }

    async run(message, args) {
        let username = message.member.user.id;

        if (dinnerutil.lastRollToday()) {
            let location = dinnerutil.reroll(username);
            if (location != null) {
                message.channel.send(":game_die: @everyone, the dinner location for tonight has been rerolled to: " + location + "!");
            } else {
                message.channel.send("Sorry, <@" + username + ">. You already rerolled this week.\n"
                    + "The dinner location is still " + dinnerutil.getCurrentLocation());
            }
        } else {
            message.channel.send("<@" + username + ">, You can't reroll because there has been no dinner roll today!");
        }
    }

}

module.exports = RerollCommand;