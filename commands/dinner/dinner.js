const commando = require('discord.js-commando');
const dinnerutil = require('../../util/dinnerutil.js');

class DinnerCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'dinner',
			group: 'dinner',
			memberName: 'dinner',
			description: 'Picks a random location to eat dinner at'
		});
	}

	async run(message, args) {
        let username = message.member.user.id;
        let location = dinnerutil.roll(username);
        if(location) {
            message.channel.send(":game_die: @everyone, the dinner location for tonight is: " + location + "!");
        } else {
            message.channel.send("Sorry, <@" + username + ">. The dinner location for tonight has already been chosen. " +
                "(" + dinnerutil.getCurrentLocation() + ")");
        }
		return null;
	}
    
}

module.exports = DinnerCommand;