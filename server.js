require('dotenv').config()
const express = require("express");
const app = express();
const port = 3000;
const axios = require('axios');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
moment().format();

app.use(
  bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get('/',
	function(req, res) {
    res.sendFile(__dirname + '/views/index.html')});
app.use(express.static(__dirname+ '/public/'));
app.listen(port, () => console.log(`App listening on port ${port}!`))

/*mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
		console.log("Connection Successful!");
	}
);

const prodHour = new Schema ({
	"Very Unproductive" : Number,
	"Unproductive" : Number,
	"Neutral" : Number,
	"Productive" : Number,
	"Very Productive" : Number,
})

const hourSchema = new Schema ({
	hourStarts : Number,
	productivity : prodHour,
	//categories :
})

const daySchema = new Schema ({
	hours: [hourSchema],
	date: String
	})

var Day = mongoose.model('Day',daySchema);

var newDay = function(record) {
	var thisDay = new Day(record);
	console.log(record);
	thisDay.save(function(err, data) {
		if (err) console.log(err);
	});
}

const searchAll = function(done) {
	Day.find(null,function(err, data){
		if (err) console.log(err);
			console.log(data);
		});
	}

async function flush() {
	await Day.deleteMany({});
}

/*var idSchema = new Schema({
	name: String
});

var Hour = mongoose.model('Hour',idSchema);
var newHour = function(id) {
	console.log('func start')
	var testHour = new Hour({'name': id});
		console.log('new hour created')
	testHour.save(function(err, data) {
		if (err) console.log(err);
	});*/



//	Hour.create({name:id}, function(err, data){

//}
//searchAll();


/*app.get('/rtime', function(req, res){
  rTimeTest();
});*/


const userCarrotStick = [
	{hourStarts: 0, byProd:{
		VUnp: -8,
		Unpr: -6,
		Neut: 0,
		Prod: -6,
		VPro: -6}
	},
	{hourStarts: 2, byProd:{
		VUnp: -8,
		Unpr: -6,
		Neut: 0,
		Prod: -6,
		VPro: -6}
	},
	{hourStarts: 3, byProd:{
		VUnp: -8,
		Unpr: -6,
		Neut: 0,
		Prod: -6,
		VPro: -6}
	},
	{hourStarts: 4, byProd:{
		VUnp: -8,
		Unpr: -6,
		Neut: 0,
		Prod: -6,
		VPro: -6}
	},
	{hourStarts: 5, byProd:{
		VUnp: -8,
		Unpr: -6,
		Neut: 0,
		Prod: -6,
		VPro: -6}
	},
	{hourStarts: 6, byProd:{
		VUnp: -8,
		Unpr: -6,
		Neut: 0,
		Prod: -6,
		VPro: -6}
	},
	{hourStarts: 7, byProd:{
		VUnp: -8,
		Unpr: -4,
		Neut: 0,
		Prod: 6,
		VPro: 8}
	},
	{hourStarts: 8, byProd:{
		VUnp: -8,
		Unpr: -4,
		Neut: 0,
		Prod: 6,
		VPro: 8}
	},
	{hourStarts: 9, byProd:{
		VUnp: -8,
		Unpr: -4,
		Neut: 0,
		Prod: 6,
		VPro: 8}
	},
	{hourStarts: 10, byProd:{
		VUnp: -8,
		Unpr: -4,
		Neut: 0,
		Prod: 6,
		VPro: 8}
	},
	{hourStarts: 11, byProd:{
		VUnp: -8,
		Unpr: -4,
		Neut: 0,
		Prod: 6,
		VPro: 8}
	},
	{hourStarts: 12, byProd:{
		VUnp: 0,
		Unpr: 0,
		Neut: 0,
		Prod: 0,
		VPro: 0}
	},
	{hourStarts: 13, byProd:{
		VUnp: -8,
		Unpr: -4,
		Neut: 0,
		Prod: 6,
		VPro: 8}
	},
	{hourStarts: 14, byProd:{
		VUnp: -8,
		Unpr: -4,
		Neut: 0,
		Prod: 6,
		VPro: 8}
	},
	{hourStarts: 15, byProd:{
		VUnp: -8,
		Unpr: -4,
		Neut: 0,
		Prod: 6,
		VPro: 8}
	},
	{hourStarts: 16, byProd:{
		VUnp: -8,
		Unpr: -4,
		Neut: 0,
		Prod: 6,
		VPro: 8}
	},
	{hourStarts: 17, byProd:{
		VUnp: -4,
		Unpr: -2,
		Neut: 0,
		Prod: 0,
		VPro: 0}
	},
	{hourStarts: 18, byProd:{
		VUnp: -8,
		Unpr: -4,
		Neut: 0,
		Prod: 0,
		VPro: 0}
	},
	{hourStarts: 19, byProd:{
		VUnp: 0,
		Unpr: 0,
		Neut: 0,
		Prod: 0,
		VPro: 0}
	},
	{hourStarts: 20, byProd:{
		VUnp: -8,
		Unpr: 0,
		Neut: 0,
		Prod: 0,
		VPro: 0}
	},
	{hourStarts: 21, byProd:{
		VUnp: -8,
		Unpr: -6,
		Neut: 0,
		Prod: 0,
		VPro: 0}
	},
	{hourStarts: 22, byProd:{
		VUnp: -8,
		Unpr: -6,
		Neut: 0,
		Prod: -6,
		VPro: -6}
	},
	{hourStarts: 23, byProd:{
		VUnp: -8,
		Unpr: -6,
		Neut: 0,
		Prod: -6,
		VPro: -6}
	}
]; // replace this with object in user instance

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
	//var date = dateObj.subtract(1, 'days');
	var date =dateObj
	var offset = dateObj.utcOffset();
	dateString = dateObj.add(offset, 'minutes')
		.toISOString()
		.slice(0, 10);
	return dateString;
}


function logYesterday(){
	var yesterday = moment().subtract(1, 'days');
	logDay(yesterday);
}

function logDay(momentObj) {
	var dateString = parseTime(momentObj);//select today's date and convert it to a format the API can read
	var fetchString = `restrict_begin=${dateString}&restrict_end=${dateString}`
	axios.get(`https://www.rescuetime.com/anapi/data?key=B63lvEkh_mK25YZwNFqFHzKz1KvOZyY79SyXKj6a&format=json&${fetchString}&perspective=interval&resolution_time=hour&restrict_kind=productivity`)
	.then(response => {
		//console.log(response.data);// instead of logging, process the data and display it
		response.dateString = dateString;
		response.dateDate = momentObj._d;
		//checkForDupes(response);
		APIparse(response);
		//console.log(productivityObj);
	})
	.catch(error => {
	console.log(error);
	});}


function APIparse(response) {
	var {rows:row} = response.data; //no variables that end in 's'
	var dateString = response.dateString;
//	console.log(row);
	var day = {
		'date': response.dateString,
		'dateObj': response.dateDate,
		hourArray:[]};
	day.hourArray.length = 24;
	for (var i = 0; i < row.length; i++) {
		var hourNumb = parseInt(row[i][0].slice(11, 13), 10); //pick the hour out of the date string and turn it into a number
		//console.log(hour);

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
		//console.log(day.hourArray[hourNumb-1]);
		day.hourArray[hourNumb] = {hourStarts: hourNumb, productivity:{}};
	}
	day.hourArray[hourNumb]["productivity"][prodLevel] = row[i][1]

//console.log(day[hour]);
	};
	//console.log(day);
	carrotStick(day);
	//console.log(day.hour);
	//console.log('Parsed:');
	//console.log(JSON.stringify(day));
	//newDay(day);
}

function carrotStick(dayRecord) {
	var dayProcessed = {
		dayStick: 0,
		dayCarrot: 0
	}
	//console.log(dayRecord);
	for (var i = 0; i < dayRecord.hourArray.length - 1; i++) {
		if (dayRecord.hourArray[i]) {//dayRecord may be empty for this hour
			var loopableHour = Object.entries(dayRecord.hourArray[i].productivity);
			//console.log(loopableHour);
			for (var j = 0; j < loopableHour.length; j++) {
				var hourRowProdLevel = loopableHour[j][0];//returns an array, ["Prodlevel", Number]
				//console.log(hourRowProdLevel);
				var hourRowTimeAmount = loopableHour[j][1];
				//console.log(hourRowTimeAmount);
				if (userCarrotStick[i].byProd[hourRowProdLevel] < 0) {
					dayProcessed.dayStick += hourRowTimeAmount * userCarrotStick[i].byProd[hourRowProdLevel];
				} else if (userCarrotStick[i].byProd[hourRowProdLevel] > 0) {
					dayProcessed.dayCarrot += hourRowTimeAmount * userCarrotStick[i].byProd[hourRowProdLevel];
				}
			}
		}

			/*VUnp
			Unpr
			Neut
			Prod
			VPro*/
		}
	console.log(dayProcessed)
	}


APIparse(testResponse);
//logYesterday(testResponse);
//getTime();
//searchAll();




	function checkForDupes(response) {
		var {rows:row} = response.data;
		var units = {};
		for (var i = 0; i < row.length; i++) {
			var dayHour = row[i][0];
			var prodLevel = row[i][3];
			if (!units[dayHour]) {
				units[dayHour] = {};
			}
			if (units[dayHour][prodLevel]) {
				break;
				console.log('dupe detected')
			} else {
				units[dayHour][prodLevel] = [row[i][1]]
			}
			console.log(units)
		}
	}

module.exports = app;
