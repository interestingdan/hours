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

mongoose.connect(process.env.MONGO_URI, {
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

function getTime(){
	var date = moment().subtract(1, 'days');
	var offset = date.utcOffset();
	date = date.add(offset, 'minutes')
		.toISOString()
		.slice(0, 10);
	return date;

}



function rTimeTest() {
	var date = getTime();//select today's date and convert it to a format the API can read
	var fetchString = `restrict_begin=2020-03-01&restrict_end=2020-03-29`
	axios.get(`https://www.rescuetime.com/anapi/data?key=B63lvEkh_mK25YZwNFqFHzKz1KvOZyY79SyXKj6a&format=json&${fetchString}&perspective=interval&resolution_time=hour&restrict_kind=productivity`)
	.then(response => {
		//console.log(response.data);// instead of logging, process the data and display it
		//response.date = date;
		checkForDupes(response);
		//APIparse(response);
		//console.log(productivityObj);
	})
	.catch(error => {
	console.log(error);
	});}


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

function APIparse(response) {
	var {rows:row} = response.data;
	var date = response.date;
//	console.log(row);
	var day = {
		'date' : date,
		hours:[]};
	day.hours.length = 24;
	for (var i = 0; i < row.length; i++) {
		var hourNumb = parseInt(row[i][0].slice(11, 13), 10); //pick the hour out of the date string and turn it into a number
		//console.log(hour);

switch(row[i][3]) {
	case -2:
	var prodLevel = "Very Unproductive";
	break;
	case -1:
	var prodLevel = "Unproductive";
	break;
	case 0:
	var prodLevel = "Neutral";
	break;
	case 1:
	var prodLevel = "Productive";
	break;
	case 2:
	var prodLevel = "Very Productive";
	break;
	}
	if (!day.hours[hourNumb]) {
		day.hours[hourNumb] = {hourStarts: hourNumb, productivity:{}};
	}
	if (day.hours[hourNumb]["productivity"][prodLevel]) {
	console.log('ping');
	day.hours[hourNumb]["productivity"][prodLevel] += row[i][1];
} else {
	day.hours[hourNumb]["productivity"][prodLevel] = row[i][1]
}
//console.log(hour);
//console.log(day[hour]);
	};
	//console.log('Parsed:');
	//console.log(JSON.stringify(day));
	//newDay(day);
}
//APIparse(testResponse);
rTimeTest();
//getTime();
//searchAll();

module.exports = app;
