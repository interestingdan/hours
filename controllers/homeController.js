var User = require('../models/user');

//var async = require('async');

exports.index = async function(req, res) {
	const current_score = await User.find({userName: 'InterDan'}, {score: 1, _id: 0});
	res.render('index', { score: current_score[0].score });
	//console.log(results);

};
