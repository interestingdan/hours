var User = require('../models/user');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        current_score: function(callback) {
            User.find({userName: 'InterDan'}, {score: 1, _id: 0},
						 callback);
        }
    }, function(err, results) {
        res.render('index', { error: err, data: results.current_score.score });
    });
};
