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

        if(dinnerutil.reroll(username)) {
            let dinnerLocation = dinnerutil.getDinnerLocation();
            message.channel.send(":game_die: @everyone, the dinner location for tonight has been rerolled to: " + dinnerLocation + "!");
        } else {
            message.channel.send("Sorry, <@" + username + ">. You already rerolled this week.");
        }
    }

}

module.exports = RerollCommand;