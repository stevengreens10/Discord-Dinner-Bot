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

function getLocalizedDateString(date) {
    return date.toLocaleString("en-US", {timeZone: "America/New_York"}).split(",")[0];
}

module.exports = {

    roll: function(user) {
        let data = this.loadDinnerData();

        try {
            let lastRollDate = new Date(data.roll.last);
            let today = new Date(getLocalizedDateString(new Date()));
            // Only concerned with day month year, not time
            today.setHours(0); today.setMinutes(0); today.setSeconds(0); today.setMilliseconds(0);

            if(lastRollDate < today) {
                data.roll.last = getLocalizedDateString(today);
                data.roll.by = user;

                let location = this.chooseDinnerLocation();
                data.roll.location = location;

                this.saveDinnerData(data);

                return location;
            }

        } catch (err) {
            console.log(err);
            return null;
        }

        return null;
    },

    reroll: function(user) {
        let today = new Date(getLocalizedDateString(new Date()));
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
                        userData.last = getLocalizedDateString(today);
                        rerollData[i] = userData;
                        data.reroll = rerollData;

                        let location = this.chooseDinnerLocation();
                        data.roll.location = location;
                        this.saveDinnerData(data);

                        return location;
                    } else {
                        return null;
                    }
                } catch(err) {
                    console.log(err);
                    return null;
                }
            }
        }

        // User is not in file
        // Can reroll and is then inserted
        let userData = {
            name: user.toLowerCase(),
            last: getLocalizedDateString(today)
        };
        rerollData.push(userData);
        data.reroll = rerollData;

        let location = this.chooseDinnerLocation();
        data.roll.location = location;
        this.saveDinnerData(data);

        return location;
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

    chooseDinnerLocation: function() {
        let date = new Date();

        let day = new Date(getLocalizedDateString(date)).getDay();

        let dinnerLocation="STARVE.";
        if (day >= 1 && day <= 4) {
            let pick = randint(0, weekday_options.length - 1);
            let pick2 = randint(0, weekday_options[pick].length - 1);
            dinnerLocation = weekday_options[pick][pick2]
        } else if(day === 5) {
            let pick = randint(0, friday_options.length - 1);
            dinnerLocation = friday_options[pick]
        } else {
            let pick = randint(0, weekend_options.length - 1);
            let pick2 = randint(0, weekend_options[pick].length - 1);
            dinnerLocation = weekend_options[pick][pick2]
        }

        return dinnerLocation;
    },

    getCurrentLocation: function() {
        if(this.lastRollToday()) {
            let data = this.loadDinnerData();
            return data.roll.location;
        }
        return null;
    },

    lastRollToday: function() {
        let data = this.loadDinnerData();

        try {
            let lastRollDate = new Date(data.roll.last);
            let today = new Date(getLocalizedDateString(new Date()));
            // Only concerned with day month year, not time
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            today.setMilliseconds(0);
            return getLocalizedDateString(today) === getLocalizedDateString(lastRollDate)
        } catch(err) {
            console.log(err);
            return false;
        }
    }

};

