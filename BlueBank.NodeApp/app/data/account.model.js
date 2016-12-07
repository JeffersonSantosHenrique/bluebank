var mongoose = require('mongoose') 
	require('mongoose-double')(mongoose),
	ObjectId = mongoose.Types.ObjectId,
	moment = require('moment');

var SchemaTypes = mongoose.Schema.Types;	

var AccountSchema = mongoose.Schema({
	agency :  { type: String, require: true },
	account : { type: String, require: true },
	balance : { type: SchemaTypes.Double, require: true },
	create : { type: Date, default: moment()}
});

// Callback returns boolean (true if account exists)
AccountSchema.statics.checkAccount = function(_data, cb){

	var data = {
		agency : _data.agency,
		account : _data.account
	};

	if (_data._id !== undefined) 
		data._id = { '$ne' : new ObjectId(_data._id) };

	this.findOne(data, function(err, accountDocument){
		
		console.log('accountdocument', accountDocument, accountDocument !== null);

		cb(err, (accountDocument !== null));

	});

};

AccountSchema.statics.findAccount = function(_data, cb){

	var data = {
		agency : _data.agency,
		account : _data.account
	};

	if (_data._id !== undefined) 
		data._id = { '$ne' : new ObjectId(_data._id) };

	this.findOne(data, function(err, accountDocument){
		
		console.log('accountdocument', accountDocument);

		cb(err, accountDocument);

	});

};

module.exports = mongoose.model('account', AccountSchema);
