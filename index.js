const commando = require('discord.js-commando');
const bot = new commando.Client();
const config = require('./config.js');

bot.registry.registerGroup('dinner', 'Dinner');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.login(config.TOKEN);

console.log('Bot successfully running');

module.exports = {
  client: bot
}