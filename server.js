require("dotenv").config();
const { DateTime } = require("luxon");
const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Day = require ("./models/Day.js");
const User = require ("./models/User.js");
//const pug = require("pug");
//const indexRouter = require('./routes/index');
/*const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});*/
const fs = require("fs");
const logger = require("morgan");
const { response } = require("express");
const userSettingsPlaceHolder = require("./AaronDSPSettings.js");
const { findOne } = require("./models/Day.js");
const rl = require ("./readlineHack.js");
const flexUpdate = require("./flexUpdate.js")
const logYesterday = require("./logYesterday.js");
const rawSample = fs.readFileSync("singleDayResponseSample.json");
var sampleResponse = JSON.parse(rawSample);
//console.log(sampleResponse);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(logger("dev"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

/*app.route('/').get((req, res) => {
	res.render(process.cwd() + '/views/pug/index.pug', {text: 'jello'});
});*/

//app.use('/', indexRouter);

app.use(express.static(path.join(__dirname, "/public/")));

app.listen(port, () => console.log(`App listening on port ${port}!`)); // - needed to run

//talk to mongoDB

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.catch((error) => {
		console.error(error);
	});

var db = mongoose.connection;

const args = process.argv.slice(2);
const mode = args[0];

db.on("error", console.error.bind(console, "Connection Error:"));

db.once("open", function () {
	console.log("Connection Successful!");
	if (mode === "write") {
		logYesterday("InterDan", userSettingsPlaceHolder);
	} else if (mode === "test") {
		flexUpdate("Test", userSettingsPlaceHolder);
	}
	//multiDayTest("InterDan");
	//saveSample();
	//roundOff("InterDan");
});
//- also needed to run

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



async function updateScoreNewDay(userNameArg, scoreArg) {
	const user = await User.findOne({ userName: userNameArg });
	user.score += scoreArg;
	const saved = await user.save();
	const newScoreUser = await User.findOne({ userName: userNameArg });
	console.log("Your score is now " + newScoreUser.score);
}

async function resetScore(userNameArg) {
	const user = await User.findOne({ userName: userNameArg }).catch((error) => {
		console.error(error);
	});
	if (!user) {
		console.log("User Not Found");
	} else {
		user.score = 0;
		const saved = await user.save().catch((error) => {
			console.error(error);
		});
		console.log(saved);
	}
}

async function showScore(userNameArg) {
	const user = await User.findOne({ userName: userNameArg }).catch((error) => {
		console.error(error);
	});
	if (!user) {
		console.log("User Not Found");
	} else {
		console.log("Your score is: " + user.score);
	}
}

async function newUser(record) {
	var thisUser = new User(record);
	console.log(record);
	await thisUser.save();
}

const searchAll = function (done) {
	Day.find(null, function (err, data) {
		if (err) console.log(err);
		console.log(data);
	});
};

async function flush() {
	await Day.deleteMany({});
}

//searchAll({});

async function roundOff(userNameArg) {
	//use this if a user's score has become a non-integer
	const user = await User.findOne({ userName: userNameArg }).catch((error) => {
		console.error(error);
	});
	if (!user) {
		console.log("User Not Found");
	} else {
		console.log("Your score is: " + user.score);
		var currScore = user.score;
	}
	let roundScore = Math.floor(currScore);
	user.score = roundScore;
	const saved = await user.save();
	const newScoreUser = await User.findOne({ userName: userNameArg });
	console.log("Your score is now " + newScoreUser.score);
}

   



/*const weekdayPicker = {
	1 : workday,
	2 : workday,
	3 : workday,
	4 : workday,
	5 : workday,
	6 : weekend,
	7 : weekend
}*/

const testResponse = {
	date: "2020-01-01",
	data: {
		rows: [
			["2020-03-11T00:00:00", 59, 1, 1],
			["2020-03-11T00:00:00", 49, 1, 0],
			["2020-03-11T00:00:00", 15, 1, -2],

			["2020-03-11T07:00:00", 357, 1, -2],
			["2020-03-11T07:00:00", 320, 1, 0],
			["2020-03-11T07:00:00", 58, 1, -1],
			["2020-03-11T07:00:00", 19, 1, 1],

			["2020-03-11T08:00:00", 1452, 1, -2],
			["2020-03-11T10:00:00", 67, 1, -2],

			["2020-03-11T11:00:00", 1013, 1, -2],

			["2020-03-11T12:00:00", 1303, 1, -2],
			["2020-03-11T12:00:00", 915, 1, 0],
			["2020-03-11T12:00:00", 215, 1, 2],
			["2020-03-11T12:00:00", 116, 1, 1],
			["2020-03-11T12:00:00", 105, 1, -1],

			["2020-03-11T13:00:00", 1432, 1, 0],
			["2020-03-11T13:00:00", 1282, 1, -2],
			["2020-03-11T13:00:00", 293, 1, 2],
			["2020-03-11T13:00:00", 73, 1, -1],
			["2020-03-11T13:00:00", 52, 1, 1],

			["2020-03-11T14:00:00", 2169, 1, 0],
			["2020-03-11T14:00:00", 339, 1, 1],
			["2020-03-11T14:00:00", 206, 1, -1],
			["2020-03-11T14:00:00", 65, 1, 2],

			["2020-03-11T15:00:00", 2728, 1, 0],
			["2020-03-11T15:00:00", 212, 1, -2],
			["2020-03-11T15:00:00", 83, 1, 1],
			["2020-03-11T15:00:00", 24, 1, 2],

			["2020-03-11T16:00:00", 142, 1, -1],
			["2020-03-11T16:00:00", 62, 1, 0],
			["2020-03-11T16:00:00", 34, 1, 1],

			["2020-03-11T17:00:00", 629, 1, -2],
			["2020-03-11T17:00:00", 30, 1, 0],
			["2020-03-11T17:00:00", 13, 1, 1],
			["2020-03-11T17:00:00", 3, 1, -1],
		],
	},
};




function multiDayTest(userName) {
	var yesterday = DateTime.fromObject({ hour: 0, minute: 0, seconds: 0 }).minus(
		{ days: 5 }
	);
	console.log(yesterday.toString());
	var today = DateTime.fromObject({ hour: 0, minute: 0, seconds: 0 }).minus({
		days: 1,
	});
	logDay(yesterday, today, userName, userSettingsPlaceHolder.settings);
}



async function saveSample() {
	let yesterday = DateTime.fromObject({ hour: 0, minute: 0, seconds: 0 }).minus(
		{ days: 1 }
	);
	let dateString = parseTime(yesterday);
	let key = process.env.USERKEY;
	let response = await pingRescuetime(dateString, dateString, key, "activity");
	let data = JSON.stringify(response.data, null, 2);
	fs.writeFileSync("singleDayResponseSample.json", data);
	console.log("done");
}










module.exports = app;
