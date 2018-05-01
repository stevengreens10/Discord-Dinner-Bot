const fs = require("fs");
const dataFile = "data/data.json";


const weekday_options = [
    ["Talley","Atrium"],["Fountain","Clark"]
];

const friday_options =[
    "Zaxby's","Penn Station","Arby's","Wendy's","Taco Bell","!Wildcard! - Choose a new place", "Waffle House", "Dp-dough"
];

const weekend_options =[
    ["Talley"], ["Fountain", "Clark"], friday_options
];


function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}

function randint(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min)) + min
}

module.exports = {

    roll: function(user) {
        let data = this.loadDinnerData();

        try {
            let lastRollDate = new Date(data.roll.last);
            let today = new Date();
            // Only concerned with day month year, not time
            today.setHours(0); today.setMinutes(0); today.setSeconds(0); today.setMilliseconds(0);

            if(lastRollDate < today) {
                data.roll.last = today.toDateString();
                data.roll.by = user;
                this.saveDinnerData(data);
                return true;
            }

        } catch (err) {
            return false;
        }

        return false;
    },

    reroll: function(user) {

        let today = new Date();
        // Only concerned with day month year, not time
        today.setHours(0); today.setMinutes(0); today.setSeconds(0); today.setMilliseconds(0);

        let data = this.loadDinnerData();
        let rerollData = data.reroll;

        for(let i = 0; i < rerollData.length; i++) {
            let userData = rerollData[i];
            if(userData.name.toLowerCase() === user.toLowerCase()) {
                // User is already in file
                // Must have rerolled a week ago
                try {
                    let lastReroll = new Date(userData.last);
                    if(datediff(lastReroll, today) >= 7) {
                        userData.last = today.toDateString();
                        rerollData[i] = userData;
                        data.reroll = rerollData;
                        this.saveDinnerData(data);
                        return true;
                    } else {
                        return false;
                    }
                } catch(err) {
                    return false;
                }
            }
        }

        // User is not in file
        // Can reroll and is then inserted
        let userData = {
            name: user.toLowerCase(),
            last: today.toDateString()
        };
        rerollData.push(userData);
        data.reroll = rerollData;
        this.saveDinnerData(data);
        return true;
    },

    loadDinnerData: function() {
        // Get content from file
        let contents = fs.readFileSync(dataFile);
        // Define to JSON type
        return JSON.parse(contents);
    },

    saveDinnerData: function(data) {
        let dataStr = JSON.stringify(data, null, 4);
        fs.writeFile(dataFile, dataStr, 'utf8', null);
    },

    getDinnerLocation: function() {
        let date = new Date();

        let day = date.getDay();

        let dinnerLocation="STARVE.";
        if (day<=3 || day===6) {
            let pick = randint(0, weekday_options.length - 1);
            let pick2 = randint(0, weekday_options[pick].length - 1);
            dinnerLocation = weekday_options[pick][pick2]
        } else if(day===4) {
            let pick = randint(0, friday_options.length - 1);
            dinnerLocation = friday_options[pick]
        } else {
            let pick = randint(0, weekend_options.length - 1);
            let pick2 = randint(0, weekend_options[pick].length - 1);
            dinnerLocation = weekend_options[pick][pick2]
        }

        return dinnerLocation;
    }

};

