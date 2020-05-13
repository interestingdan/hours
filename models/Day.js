const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prodHour = new Schema ({
	"Very Unproductive" : Number,
	"Unproductive" : Number,
	"Neutral" : Number,
	"Productive" : Number,
	"Very Productive" : Number,
})

const hourSchema = new Schema ({
	hourStart : Number,
	productivity : prodHour,
	carrotStick: Number
	//categories :
})

const daySchema = new Schema ({
	hourArray : [hourSchema],
	date : {type: String, unique: true},
	//dateObj :
	})

	module.exports = mongoose.model('Day', daySchema)
