const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Day = require('./Day');

const userSchema = new Schema ({
	userName : {
		type : String,
		unique : true},
	days : [{
		type: Schema.Types.ObjectId,
		ref: 'Day'}]
})

module.exports = mongoose.model('User', userSchema)
