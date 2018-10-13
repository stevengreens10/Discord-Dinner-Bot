const commando = require('discord.js-commando');
const dinnerutil = require('../../util/dinnerutil.js');

class ResetCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'reset',
			group: 'dinner',
			memberName: 'reset',
			description: 'Resets dinner stats'
		});
	}

	async run(message, args) {
        let username = message.member.user.id;  
        message.channel.send(":game_die: @everyone, the dinner location and rerolls have been reset!");
        
        dinnerutil.resetData();
        
		return null;
	}
    
}

module.exports = ResetCommand;