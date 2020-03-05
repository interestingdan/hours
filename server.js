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

/*db.once('open', function() {
		console.log("Connection Successful!");
	}
);*/
const searchAll = function(done) {
	Hour.find(null,function(err, data){
		if (err) console.log(err);
			console.log(data);
		});
	}

var idSchema = new Schema({
	name: String
});

var Hour = mongoose.model('Hour',idSchema);
var newHour = function(id) {
	console.log('func start')
	var testHour = new Hour({'name': id});
		console.log('new hour created')
	testHour.save(function(err, data) {
		if (err) console.log(err);
	});

//	Hour.create({name:id}, function(err, data){

}
//searchAll();


const productivityObj = {
	"Very Unproductive": 0,
	"Unproductive:": 0,
	"Neutral": 0,
	"Productive": 0,
	"Very Productive": 0
};

app.get('/rtime', function(req, res){
  rTimeTest();
});

function getTime(){
	var endDate = moment();
	//var beginDate = new Date(moment());
	//beginDate.setDate(beginDate.getDate() - 1);
	//console.log(endDate, beginDate);
	var offset = endDate.utcOffset();
	endDate = endDate.add(offset, 'minutes');
	var time = endDate.toISOString();
	console.log(time);
	return;
	beginDate.toISOString().truncate; //
	endDate.toISOString().truncate;
	var fetchString = `restrict_begin=${beginDate}&restrict_end=${endDate}`
	return fetchString;
	console.log(ISOtimeNow);
}

getTime();

function rTimeTest() {
	//select today's date and convert it to a format the API can read
	var today = getTime();
	axios.get('https://www.rescuetime.com/anapi/data?key=B63lvEkh_mK25YZwNFqFHzKz1KvOZyY79SyXKj6a&format=json&restrict_begin=2020-01-01&restrict_end=2020-01-02&perspective=interval&resolution_time=day&restrict_kind=productivity&device_type=offline')
  .then(response => {
    //console.log(response.data);// instead of logging, process the data and display it
		APIparse(response);
		console.log(productivityObj);
  })
  .catch(error => {
    console.log(error);
  });}

	const testResponse = {"data":
		{"rows":
			[ [ '2020-01-01T00:00:00', 19620, 1, -2 ],
				[ '2020-01-01T00:00:00', 2348, 1, 0 ],
				[ '2020-01-01T00:00:00', 1180, 1, 2 ],
				[ '2020-01-01T00:00:00', 681, 1, 1 ],
				[ '2020-01-01T00:00:00', 239, 1, -1 ],
				[ '2020-01-02T00:00:00', 16283, 1, -2 ],
				[ '2020-01-02T00:00:00', 2393, 1, 1 ],
				[ '2020-01-02T00:00:00', 2213, 1, 2 ],
				[ '2020-01-02T00:00:00', 1242, 1, 0 ],
				[ '2020-01-02T00:00:00', 487, 1, -1 ]
			]
		}
	}

function APIparse(response) {
	var {rows:row} = response.data;
//	console.log(row);
	for (var i = 0; i + 1 < row.length; i++) {
		switch(row[i][3]) {
			case -2:
			productivityObj["Very Unproductive"] += row[i][1];
			break;
			case -1:
			productivityObj["Unproductive"] += row[i][1];
			break;
			case 0:
			productivityObj["Neutral"] += row[i][1];
			break;
			case 1:
			productivityObj["Productive"] += row[i][1];
			break;
			case 2:
			productivityObj["Very Productive"] += row[i][1];
			break;
		}
	};
	console.log(productivityObj);
}


module.exports = app;
