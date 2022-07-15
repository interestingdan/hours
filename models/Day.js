const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const activitySchema = new Schema ({
	appName : String,
	totalSeconds : Number,
	rowCategory : String,
	rowProductivity : String,
	activityCarrot : Number,
	activitySTick : Number,
})
/*const prodHour = new Schema ({
	"Very Unproductive" : Number,
	"Unproductive" : Number,
	"Neutral" : Number,
	"Productive" : Number,
	"Very Productive" : Number,
})

const catHour = new Schema ({
	"General Social Networking" : Number,
	"Games" : Number,
	"Instant Message" : Number,
	"Writing" : Number,
	"Video" : Number,
	"Photos" : Number,
	"Project Management" : Number,
	"General Software Development" : Number,
	"Editing & IDEs" : Number
})*/

const hourSchema = new Schema ({
	hourStarts : Number,
	totalTime : Number,
	carrot: Number,
	stick: Number,
	activities : [activitySchema]
})

const daySchema = new Schema ({

	userName : String,
	dateObj : Date,
	hourArray : [hourSchema],
	dateString : {type: String, unique: true},
	dayScore : Number,
	})

	module.exports = mongoose.model('Day', daySchema)
