const express = require("express");
const app = express();
const port = 3000;
const https = require('https');
const axios = require('axios');
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get('/',
	function(req, res) {
    res.sendFile(__dirname + '/views/index.html')});
app.use(express.static(__dirname+ '/public/'));
app.listen(port, () => console.log(`App listening on port ${port}!`))
app.get('/NASA', function(req, res){
  nasaTest();
});

function nasaTest() {
	axios.get('https://api.nasa.gov/planetary/apod?api_key=zX0JUZ5ndbcwj0fTp7caszm4H0RQzGgWWaMVoj3B')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });}
const productivityObj = {"fish":"yeah"};
app.get('/rtime', function(req, res){
  rTimeTest();
});
rTimeTest();
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

function APIparse(response) {
	var {rows:row} = response.data;
	console.log(row);

	for (var i = 1; i<row.length ;i++) {
		var prodVal = row[i][3];
		console.log(prodVal);
		if (productivityObj.hasOwnProperty(prodVal)) {
			productivityObj.prodVal += row[i][1];
		} else {
			productivityObj.prodVal = row[i][1]
		}
	}
}
module.exports = app;
