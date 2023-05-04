const { DateTime } = require("luxon");
const axios = require("axios");
/*const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});*/
const mongoose = require("mongoose");
const Day = require ("./models/Day.js");
const User = require ("./models/User.js");
const rl = require ("./readlineHack.js");



async function updateScore(userNameArg, scoreArg) {
	const user = await User.findOne({ userName: userNameArg });
	user.score += scoreArg;
	const saved = await user.save();
	const newScoreUser = await User.findOne({ userName: userNameArg });
	console.log("Your score is now " + newScoreUser.score);
}

function parseTime(dateObj) {
	var dateString = dateObj.toString().slice(0, 10);
	return dateString;
}

function classifyDay(momentArg, userSettings) {
	var dayNumber = momentArg.weekday;
	var dot = userSettings.weekdayPicker[dayNumber]; //returns a string
	return userSettings.carrotStick[[dot]]; //turns that string to a property name
}
//ToDo: don't do any of this, change the above to pick a setting from an array

function pingRescuetime(startDateStringArg, endDateStringArg, keyArg, kindArg) {
	return axios.get(
		`https://www.rescuetime.com/anapi/data?key=${keyArg}&format=json&restrict_begin=${startDateStringArg}&restrict_end=${endDateStringArg}&perspective=interval&resolution_time=hour&restrict_kind=${kindArg}`
	);
}

function prodConvert(prodNumber) {
	switch (prodNumber) {
		case -2:
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
	}
	/*
	{-2 : "VUnp",
	-1 : "Unpr",
	0 : "Neut",
	1 : "Prod",
	2 : "VPro"}
*/
}

const modifier = 0.0086; // this is a magic number that adjusts the value of carrotstick points. Five minutes at -6 (unproductive) is equal to -15.48 points with this modifier


class ActivityRecord {
	constructor(rowData) {
		let [, rowTotalSeconds, , rowActivity, rowCategory, rowProductivity] =
			rowData;
		this.appName = rowActivity;
		this.totalSeconds = rowTotalSeconds;
		this.rowCategory = rowCategory;
		this.rowProductivity = prodConvert(rowProductivity); //make rowProductivity a string not a number
		this.activityCarrot = 0;
		this.activityStick = 0;
	}
	addScore(score) {
		this.activityCarrot = score;
	}
	subtractScore(score) {
		this.activityStick = score;
	}
}

class HourRecord {
	constructor(hourNumb, hourSettings) {
		this.hourStarts = hourNumb;
		this.activitySettings = hourSettings.byAct;
		this.categorySettings = hourSettings.byCat;
		this.productivitySettings = hourSettings.byProd;
		this.activities = [];
		this.totalTime = 0;
		this.carrot = 0;
		this.stick = 0;
	}

	parseRow(rowData) {
		let newActivity = new ActivityRecord(rowData);
		let actName = newActivity.appName;
		//console.log("activity name is " + actName)
		if (this.activitySettings[actName] != undefined) {
			var activityScore =
				this.activitySettings[newActivity.appName] *
				newActivity.totalSeconds *
				modifier;
		} else if (this.categorySettings[newActivity.rowCategory] != undefined) {
			//console.log('cat found');
			//console.log(this.categorySettings[newActivity.rowCategory]);
			//console.log(this.activitySettings[[newActivity.rowCategory]]);
			var activityScore =
				this.categorySettings[newActivity.rowCategory] *
				newActivity.totalSeconds *
				modifier;
			//console.log(activityScore);
		} else {
			//console.log('prod used')
			let prodLevel = newActivity.rowProductivity;
			var activityScore =
				this.productivitySettings[prodLevel] *
				newActivity.totalSeconds *
				modifier;
		}
		this.totalTime += newActivity.totalSeconds;
		if (activityScore != 0) {
			if (activityScore > 0) {
				this.carrot += activityScore;
				newActivity.addScore(activityScore);
			} else {
				this.stick += activityScore;
				newActivity.subtractScore(activityScore);
			}
		}
		this.activities.push(newActivity);
	}

	mostly() {
		if (this.carrot > -1 * this.stick) { //this.stick will be a negative number, so we invert it before checking which is bigger
			this.activities.sort((a, b) => {
				return b.activityCarrot - a.activityCarrot;
			});
			let percentage = Math.floor(
				(this.activities[0].activityCarrot / this.carrot) * 100
			);
			return `%${percentage} ${this.activities[0].appName}`;
		} else {
			this.activities.sort((a, b) => {
				return a.activityStick - b.activityStick;
			});
			let percentage = Math.floor(
				(this.activities[0].activityStick / this.stick) * 100
			);
			return `%${percentage} ${this.activities[0].appName}`;
		}
	}
}

class DayRecord {
	constructor(userName, dateObj, userSettings) {
		this.userName = userName;
		this.dateObj = dateObj;
		this.dateString = parseTime(dateObj);
		this.hourArray = [];
		this.dayScore = 0;
		this.daySettings = classifyDay(dateObj, userSettings);
		for (let i = 0; i < 24; i++) {
			let hourSettings = this.daySettings[i];
			let newHour = new HourRecord(i, hourSettings);
			this.hourArray.push(newHour);
		}
	}
	finalise() {
		for (let hour of this.hourArray) {
			// use dateObj.toJSDate() to turn dateObj into a JS DateTime Mongoose can query
			let hourScore = hour.carrot + hour.stick;
			if (hour.carrot || hour.stick) {
				console.log(
					`${hour.hourStarts}: ${Math.floor(hourScore)}, ${hour.mostly()}`
				);
				this.dayScore += hourScore;
			} else {
				console.log(`${hour.hourStarts}: `);
			}
		}
		console.log(
			`Total score for ${this.userName} on ${this.dateString}: ${Math.floor(
				this.dayScore
			)}`
		);
	}
}

async function logYesterday(userName, userSettingsPlaceHolder) {
	//let yesterday = DateTime.fromObject({year: 2022, month: 5, day: 7});
	let yesterday = DateTime.fromObject({ hour: 0, minute: 0, seconds: 0 }).minus({ days: 1 });
	//console.log(yesterday.toString());
	let dayArray = await logDay(
		yesterday,
		yesterday,
		userName,
		userSettingsPlaceHolder.settings
	);
	let totalScore = 0;
	for (let day of dayArray) {
		day.finalise();
		totalScore += day.dayScore;
	}
	//console.log("No time logged: test function only");
	{rl.question("Enter 'Y' to commit ", async function (input) {
		if (input === "Y" || input === "y") {
			await updateScore(userName, Math.floor(totalScore)).catch((error) => {
				console.error(error);
			});
			process.exit();
		}
	
		rl.close();
	});
}}

async function logDay(startDateObj, endDateObj, userName, userSettings) {
	//var carrotStickObj = classifyDay(momentObj);
	//fetch user carrotstick object from database
	let startDateString = parseTime(startDateObj);
	let endDateString = parseTime(endDateObj);
	let key = process.env.USERKEY;
	let response = await pingRescuetime(startDateString, endDateString, key, "activity");
	let mutableDateTime = startDateObj; //declares a new object that will mutate as the response is processed, leaving startDate static
	let mutableDateString = parseTime(mutableDateTime);
	//mutableDateString = "2022-05-07";
	var currentDay = new DayRecord(userName, startDateObj, userSettings);
	let dayArray = [];
	for (row of response.data.rows) {
		//to work from local test, chaneg to sampleResponse.rows
		//let currentDay = dayArray[dayArray.length - 1]; // currentDay is the last entry in dayArray
		//console.log(dayArray);
		let rowDate = row[0].slice(0, 10);
		let rowTime = parseInt(row[0].slice(11, 13));
		if (mutableDateString !== rowDate) {
			//console.log("mutableDateString: " + mutableDateString);
			//console.log("rowDate: " + rowDate);
			dayArray.push(currentDay);
			mutableDateTime = mutableDateTime.plus({ days: 1 });
			mutableDateString = parseTime(mutableDateTime);
			var currentDay = new DayRecord(userName, mutableDateTime, userSettings);
			//console.log('New day ' + currentDay);
		}
		//console.log(currentDay);
		currentDay.hourArray[rowTime].parseRow(row);
		//console.log(currentDay.hourArray[rowTime].activities[activities.length - 1]);
	}
	dayArray.push(currentDay);
	//console.log(dayArray[0]);
	return dayArray;
}

module.exports = logYesterday