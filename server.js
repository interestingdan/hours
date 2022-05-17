require('dotenv').config()
const { DateTime } = require("luxon");
const express = require("express");
const app = express();
const port = 3000;
const axios = require('axios');
const bodyParser = require("body-parser");
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Day = require("./models/Day.js");
const User = require("./models/User.js");
const moment = require('moment');
moment().format();
const pug = require('pug');
//const indexRouter = require('./routes/index');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require("fs");
const logger = require('morgan');
const { response } = require('express');
const userSettingsPlaceHolder= require("./AaronSettings.js");
const rawSample = fs.readFileSync('singleDayResponseSample.json');
var sampleResponse = JSON.parse(rawSample);
//console.log(sampleResponse);

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(logger('dev'));

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));

/*app.route('/').get((req, res) => {
	res.render(process.cwd() + '/views/pug/index.pug', {text: 'jello'});
});*/

//app.use('/', indexRouter);

app.use(express.static(path.join(__dirname, '/public/')));

//app.listen(port, () => console.log(`App listening on port ${port}!`)); // - needed to run

//talk to mongoDB

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true}).catch(error => { console.error(error) });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));

/*db.once('open', function() {
		console.log("Connection Successful!");
		logYesterday("InterDan", userSettingsPlaceHolder);
		//multiDayTest("InterDan");
		//saveSample();
	}
);
*/  //- also needed to run




/*const newDay = function(record) {
	var thisDay = new Day(record);
	console.log(record);
	thisDay.save(function(err, data) {
		if (err) console.log(err);
	});
}*/

//aconsole.log(userSettingsPlaceHolder);

async function newDay(record) {
	var thisDay = new Day(record);
	await thisDay.save();
}

async function updateScore(userNameArg, scoreArg){
	/*const user = await User.findOne({"userName" : userNameArg})
	user.score += scoreArg;
	const saved = await user.save()
	const newScoreUser = await User.findOne({"userName" : userNameArg})
	console.log("Your score is now " + newScoreUser.score)*/
};

async function resetScore(userNameArg){
	const user = await User.findOne({"userName" : userNameArg})
		.catch(error => { console.error(error) });
	if (!user) {
		console.log("User Not Found")
	} else {
	user.score = 0;
	const saved = await user.save()
	.catch(error => { console.error(error) });
	console.log(saved)
	}
};

async function showScore(userNameArg){
	const user = await User.findOne({"userName" : userNameArg})
		.catch(error => { console.error(error) })
	if (!user) {
		console.log("User Not Found")
	} else {
	console.log("Your score is: " + user.score);
	}
};

async function newUser(record) {
	var thisUser = new User(record);
	console.log(record);
	await thisUser.save();
};

const searchAll = function(done) {
	Day.find(null, function(err, data){
		if (err) console.log(err);
			console.log(data);
		});
	};

async function flush() {
	await Day.deleteMany({});
};

//searchAll({});



function hourScore(hourArray){
	var x;
	for (x of hourArray){
		if(x){
			console.log(x.hourStart + " : " + Math.round(x.carrotStick));
		}
	}
}



const modifier = 0.0086;


/*const weekdayPicker = {
	1 : workday,
	2 : workday,
	3 : workday,
	4 : workday,
	5 : workday,
	6 : weekend,
	7 : weekend
}*/

const testResponse = {"date": "2020-01-01",
"data":
	{rows: [
	[ '2020-03-11T00:00:00', 59, 1, 1 ],
	[ '2020-03-11T00:00:00', 49, 1, 0 ],
	[ '2020-03-11T00:00:00', 15, 1, -2 ],

	[ '2020-03-11T07:00:00', 357, 1, -2 ],
	[ '2020-03-11T07:00:00', 320, 1, 0 ],
	[ '2020-03-11T07:00:00', 58, 1, -1 ],
	[ '2020-03-11T07:00:00', 19, 1, 1 ],

	[ '2020-03-11T08:00:00', 1452, 1, -2 ],
	[ '2020-03-11T10:00:00', 67, 1, -2 ],

	[ '2020-03-11T11:00:00', 1013, 1, -2 ],

	[ '2020-03-11T12:00:00', 1303, 1, -2 ],
	[ '2020-03-11T12:00:00', 915, 1, 0 ],
	[ '2020-03-11T12:00:00', 215, 1, 2 ],
	[ '2020-03-11T12:00:00', 116, 1, 1 ],
	[ '2020-03-11T12:00:00', 105, 1, -1 ],

	[ '2020-03-11T13:00:00', 1432, 1, 0 ],
	[ '2020-03-11T13:00:00', 1282, 1, -2 ],
	[ '2020-03-11T13:00:00', 293, 1, 2 ],
	[ '2020-03-11T13:00:00', 73, 1, -1 ],
	[ '2020-03-11T13:00:00', 52, 1, 1 ],

	[ '2020-03-11T14:00:00', 2169, 1, 0 ],
	[ '2020-03-11T14:00:00', 339, 1, 1 ],
	[ '2020-03-11T14:00:00', 206, 1, -1 ],
	[ '2020-03-11T14:00:00', 65, 1, 2 ],

	[ '2020-03-11T15:00:00', 2728, 1, 0 ],
	[ '2020-03-11T15:00:00', 212, 1, -2 ],
	[ '2020-03-11T15:00:00', 83, 1, 1 ],
	[ '2020-03-11T15:00:00', 24, 1, 2 ],

	[ '2020-03-11T16:00:00', 142, 1, -1 ],
	[ '2020-03-11T16:00:00', 62, 1, 0 ],
	[ '2020-03-11T16:00:00', 34, 1, 1 ],

	[ '2020-03-11T17:00:00', 629, 1, -2 ],
	[ '2020-03-11T17:00:00', 30, 1, 0 ],
	[ '2020-03-11T17:00:00', 13, 1, 1 ],
	[ '2020-03-11T17:00:00', 3, 1, -1 ],
]
	}
}

function parseTime(dateObj){
	var dateString = dateObj
		.toString()
		.slice(0, 10);
	return dateString;
}

function classifyDay(momentArg, userSettings){
	var dayNumber = momentArg.weekday;
	var dot = userSettings.weekdayPicker[dayNumber]; //returns a string
	return userSettings.carrotStick[[dot]]; //turns that string to a property name
}
//ToDo: don't do any of this, change the above to pick a setting from an array


function logYesterday(userName, userSettingsPlaceHolder) {
	var yesterday = DateTime.fromObject({hour: 0, minute: 0, seconds: 0}).minus({ days: 1 });
	//console.log(yesterday.toString());

	logDay(yesterday, yesterday, userName, userSettingsPlaceHolder.settings);
}

function multiDayTest(userName) {
	var yesterday = DateTime.fromObject({hour: 0, minute: 0, seconds: 0}).minus({ days: 5 });
	console.log(yesterday.toString());
	var today = DateTime.fromObject({hour: 0, minute: 0, seconds: 0}).minus({ days: 1});
	logDay(yesterday, today, userName, userSettingsPlaceHolder.settings);
}

function pingRescuetime(startDateStringArg, endDateStringArg, keyArg, kindArg) {
return axios.get(`https://www.rescuetime.com/anapi/data?key=${keyArg}&format=json&restrict_begin=${startDateStringArg}&restrict_end=${endDateStringArg}&perspective=interval&resolution_time=hour&restrict_kind=${kindArg}`);
}


async function saveSample() {
	let yesterday = DateTime.fromObject({hour: 0, minute: 0, seconds: 0}).minus({ days: 1 });
	let dateString = parseTime(yesterday);
	let key = process.env.USERKEY;
	let response = await pingRescuetime(dateString, dateString, key, 'activity');
	let data = JSON.stringify(response.data, null, 2);
	fs.writeFileSync('singleDayResponseSample.json', data);
	console.log('done');
}

class ActivityRecord {
 constructor (rowData) {
 let [,rowTotalSeconds,, rowActivity, rowCategory, rowProductivity] = rowData;
 this.appName = rowActivity;
 this.totalSeconds = rowTotalSeconds;
 this.rowCategory = rowCategory;
 this.rowProductivity = rowProductivity;
 this.activityCarrot = 0;
 this.activityStick = 0;
 }
 addScore(score){
 this.activityCarrot = score;
 }
 subtractScore(score) {
 this.activityStick = score;
 }
};

class HourRecord {
	constructor (hourNumb, hourSettings) {
		this.hourStart = hourNumb;
		this.activitySettings = hourSettings.byAct;
		this.categorySettings = hourSettings.byCat;
		this.productivitySettings = hourSettings.byProd;
		this.activities = [];
		this.totalTime = 0;
		this.carrot = 0;
		this.stick = 0;
	}

	parseRow(rowData) {
		let newActivity = new ActivityRecord (rowData);
		let actName = newActivity.appName;
		if (this.activitySettings[actName] != undefined) {
			var activityScore = this.activitySettings[newActivity.appName] * newActivity.totalSeconds * modifier;

		} else if (this.categorySettings[newActivity.rowCategory] != undefined) {
			console.log('cat found');
			console.log(this.categorySettings[newActivity.rowCategory]);
			var activityScore = this.activitySettings[[newActivity.rowCategory]] * newActivity.totalSeconds * modifier;
			//console.log(activityScore);

		} else {
			console.log('prod used')
			let prodNumber = newActivity.rowProductivity;
			let prodLevel = function (prodNumber) {
			-2 : "VUnp",
			-1 : "Unpr",
			0 : "Neut",
			1 : "Prod",
			2 : "VPro"
			}


/*			case -2:
			return "VUnp";
			break;
			case -1:
			return "Unpr";
			break;
			case 0:
			return "Neut";
			break;
			case 1:
			return "Prod";
			break;
			case 2:
			return "VPro";
			break;
			}*/
			var activityScore = this.activitySettings[[prodLevel]] * newActivity.totalSeconds * modifier;
			//console.log(this.activitySettings[prodLevel]);
			//console.log(newActivity.totalSeconds);
			//console.log(activityScore);
			}
		
		//console.log(activityScore);
		if (activityScore > 0) {
				this.carrot += activityScore;
				this.totalTime += newActivity.totalSeconds;
				newActivity.addScore(activityScore);
			} else {
				this.totalTime += newActivity.totalSeconds;
				this.stick += activityScore;
				newActivity.subtractScore(activityScore);
			}
		this.activities.push(newActivity);
		}
}

class DayRecord {
	constructor (userName, dateObj, userSettings) {
		this.userName = userName;
		this.dateObj = dateObj;
		this.dateString = parseTime(dateObj);
		this.hourArray = [];
		this.dayScore = 0;
		this.daySettings = classifyDay(dateObj, userSettings);
		for (let i = 0; i < 24; i++) {
			let hourSettings = this.daySettings[i];
			let newHour = new HourRecord (i, hourSettings)
			this.hourArray.push(newHour);
		}
	}
	finalise() {
		for (let hour in this.hourArray) {
			let hourScore = hour.carrot - hour.stick
			console.log(`${hour.hourStarts} : ${hourScore}`);
			this.dayScore += hourScore;
			console.log(`Total score for ${dateString} : ${this.dayScore}`);
		}
	}

}




/*
function initDayArray(response, startDateObj, userName, userSettings){
	//console.log(beginMomentObj.format());
	
	//console.log(mutableMoment.format());
	for (row of response.rows) {
		let currentDay = dayArray[dayArray.length - 1];
		let rowDate = row[0].slice(0, 10);
		let rowTime = parseInt(row[0].slice(11, 13), 10);
		//console.log(rowDate.toDate());
		//console.log(mutableDateString.toDate());
		//console.log(response);
		if (mutableDateString === rowDate) {
			if (!currentDay.hourArray[rowTime]) {
			currentDay.hourArray[rowTime] = new HourRecord(rowTime, userSettings);
			}
		} else {
			mutableDateTime = mutableDateTime.plus({days: 1});
			mutableDateString = parseTime(mutableDateTime);
			let newDay = new DayRecord(userName, mutableDateTime);
			dayArray.push(newDay);
		}
	};
	return dayArray;
}
*/
async function logDay(startDateObj, endDateObj, userName, userSettings) {
	//var carrotStickObj = classifyDay(momentObj);
	//fetch user carrotstick object from database
	let startDateString = parseTime(startDateObj);
	let endDateString = parseTime(endDateObj);
	let key = process.env.USERKEY;
	//let response = await pingRescuetime(startDateString, endDateString, key, 'activity');
	let mutableDateTime = startDateObj; //declares a new object that will mutate as the response is processed, leaving startDate static
	let mutableDateString = parseTime(mutableDateTime);
	var currentDay = new DayRecord(userName, startDateObj, userSettings);
	let dayArray = [];
	for (row of sampleResponse.rows) { // will need to change back to response.data.rows
		//let currentDay = dayArray[dayArray.length - 1]; // currentDay is the last entry in dayArray
		//console.log(dayArray);
		let rowDate = row[0].slice(0, 10);
		let rowTime = parseInt(row[0].slice(11, 13));
		if (mutableDateString !== rowDate) {
			console.log(mutableDateString);
			console.log(rowDate);
		
			dayArray.push(currentDay);
			mutableDateTime = mutableDateTime.plus({days: 1});
			mutableDateString = parseTime(mutableDateTime);
			var currentDay = new DayRecord(userName, mutableDateTime, userSettings);
			//console.log('New day ' + currentDay);
		}
		//console.log(currentDay);
		currentDay.hourArray[rowTime].parseRow(row);
		//console.log(currentDay.hourArray[rowTime].activities[activities.length - 1]);
	};
	for (let day in dayArray) {
	dayArray[day].finalise();
	}
	//console.log(toDayArray);

	//queryArr.forEach(element => {console.log(element.data.row_headers)});
	



	/*axios.get(`https://www.rescuetime.com/anapi/data?key=B63lvEkh_mK25YZwNFqFHzKz1KvOZyY79SyXKj6a&format=json&${fetchString}&perspective=interval&resolution_time=hour&restrict_kind=productivity`)
		.then(response => {
			console.log(response);
			response.dateString = dateString;
			//response.dateDate = momentObj._d;
			//checkForDupes(response);
			response.userName = userName;
			//APIparse(response, carrotStickObj);
			//console.log(productivityObj);
		})
		.catch(error => {
			console.log(error);
		});*/
}


/*
function APIparse(response, carrotStickObj) {
	var {rows:row} = response.data; //no variables that end in 's'
	var dateString = response.dateString;
	var userName =response.userName;
	//	console.log(row);
	var day = {
		'date': response.dateString,
		//'dateObj': response.dateDate,
		hourArray:[],
		dayScore: 0
	};
	day.hourArray.length = 24;
	for (var i = 0; i < row.length; i++) {
		var hourNumb = parseInt(row[i][0].slice(11, 13), 10); //pick the hour out of the date string and turn it into a number
		//console.log(hourNumb);
		switch(row[i][3]) {  //pick the productivity level from the row an
			case -2:
			var prodLevel = "VUnp";
			break;
			case -1:
			var prodLevel = "Unpr";
			break;
			case 0:
			var prodLevel = "Neut";
			break;
			case 1:
			var prodLevel = "Prod";
			break;
			case 2:
			var prodLevel = "VPro";
			break;
		}
		if (!day.hourArray[hourNumb]) {
			day.hourArray[hourNumb] = {
				hourStart: hourNumb,
				productivity: {},
				carrotStick: 0}
			}
			day.hourArray[hourNumb]["productivity"][prodLevel] = row[i][1];
			day.hourArray[hourNumb].carrotStick += row[i][1] * carrotStickObj[hourNumb].byProd[prodLevel] * modifier;
			day.dayScore += row[i][1] * carrotStickObj[hourNumb].byProd[prodLevel] * modifier;
		};
		hourScore(day.hourArray);
		day.dayScore = Math.round(day.dayScore);
		console.log(day.dayScore);
		console.log("No time logged: test function only");
		/*rl.question("Enter 'Y' to commit ", function(input) {
			if (input === "Y" || input === "y") {
				//updateScore(userName, day.dayScore).catch(error => { console.error(error) });
			}
			rl.close();
		});*/
		//updateScore(userName, day.dayScore).catch(error => { console.error(error) });
	//}

logYesterday("InterDan", userSettingsPlaceHolder);
//logYesterday("InterDan");
//resetScore("InterDan");
//showScore("InterDan");



module.exports = app;
