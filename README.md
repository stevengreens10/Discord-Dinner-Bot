# Discord-Dinner-Bot
Discord bot that to choose the location to eat dinner for the night. Any user on the server may choose to reroll the choice, but they may only do this once a week.

## Setup
- Clone this repository and run `npm install` in the directory to install the necessary dependencies.
- Now edit `config.js` and change the TOKEN to your bot's token (found in the applications section on the discord website)
- bAll that's left is to run the bot with node: `node index.js`.

## Commands
`!dinner` - This is the main command to choose the dinner location. It can be executed once per day on the server.
`!reroll` - Can overturn the decision chosen by `!dinner`. Every user on the server is allowed to reroll the location only once per week.

## Data storage
Information about the last dates and by whom the `!dinner` and `!reroll` commands were executed can be found in `data/data.json` stored in JSON format. This information will be read and written to automatically as the commands are executed.
