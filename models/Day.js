const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prodHour = new Schema ({
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
})

const hourSchema = new Schema ({
	hourStart : Number,
	productivity : prodHour,
	carrotStick: Number,
	category : catHour
})

const daySchema = new Schema ({
	hourArray : [hourSchema],
	date : {type: String, unique: true},
	dayScore : Number,
	//dateObj :
	})

	module.exports = mongoose.model('Day', daySchema)
