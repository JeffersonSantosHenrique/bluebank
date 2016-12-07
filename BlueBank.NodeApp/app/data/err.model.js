var mongoose = require('mongoose'),
	moment = require('moment');

var ErrSchema = mongoose.Schema({
	error : { type: Object, require: true },
	create : { type: Date, default: moment() }
});

module.exports = mongoose.model('error', ErrSchema);