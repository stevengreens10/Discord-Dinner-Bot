const commando = require('discord.js-commando');

const weekday_options = [
    ["Talley","Atrium"],["Fountain","Clark"]
]

const friday_options =[
    "Zaxby's","Penn Station","Arby's","Wendy's","Taco Bell","!Wildcard! - Choose a new place", "Waffle House", "Dp-dough"
]

const weekend_options =[
    ["Talley"], ["Fountain", "Clark"], friday_options
]

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
        // Splits by space for possible arguments
		let splitMessage = (message.content).split(' ');

        var date = new Date();
        
        var day = date.getDay();
        
        let dinnerLocation="STARVE."
        if (day<=3 || day==6) {
            let pick = randint(0, weekday_options.length - 1)
            let pick2 = randint(0, weekday_options[pick].length - 1)
            dinnerLocation = weekday_options[pick][pick2]
        } else if(day==4) {
            let pick = randint(0, friday_options.length - 1)
            dinnerLocation = friday_options[pick]
        } else {
            let pick = randint(0, weekend_options.length - 1)
            let pick2 = randint(0, weekend_options[pick].length - 1)
            dinnerLocation = weekend_options[pick][pick2]
        }
        
		//message.channel.send(":game_die: @everyone, the dinner location for tonight is: " + dinnerLocation + "!");
		return dinnerLocation;
	}
    
    function randint(min, max) {
        return Math.floor(Math.random() * ((max + 1) - min)) + min
    }
}

module.exports = DinnerCommand;