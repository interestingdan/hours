const express = require("express");
const app = express();
const port = 3000;
const axios = require('axios');
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
app.use(
  bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get('/',
	function(req, res) {
    res.sendFile(__dirname + '/views/index.html')});
app.use(express.static(__dirname+ '/public/'));
app.listen(port, () => console.log(`App listening on port ${port}!`))
mongoose.connect('mongodb+srv://amatthews:ceek%2dcler4FRIW@cluster0-nrqcd.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true });

const searchAll = function(done) {
	results = Person.find(function(error, data){
		if (error) console.log(error);
		return data;
		});
	done(null, data);
	console.log(data);
	}
searchAll();

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
//rTimeTest();
function rTimeTest() {
	//select today's date and convert it to a format the API can read
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
