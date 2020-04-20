const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

module.exports = mongoose.model('User', userSchema)
