var _restController = require('./rest.controller'),
	errMessages = require('../../common/messages/error.messages'),
	AccountModel = require('../../data/account.model');

function TransferController(){}

TransferController.prototype.postTransfer = function(req, res) {
	
	var restController = new _restController();

	//Get body data
	var dataSource = {
		agency : req.body.source.agency,
		account : req.body.source.account,
		balance : (parseFloat(req.body.source.balance) - parseFloat(req.body.transfer))
	};

	var dataDestination = {
		agency : req.body.destination.agency,
		account : req.body.destination.account,
		balance : (parseFloat(req.body.destination.balance) + parseFloat(req.body.transfer))
	};

	AccountModel.findOneAndUpdate({ 'agency': dataSource.agency, 'account': dataSource.account }, { 'balance' : dataSource.balance }, { upsert: true }, function(err, docSource){

		if (err) {
	
			restController.response.errors.push({
				code : err.code,
				message : err.message
			});

		} else {

			AccountModel.findOneAndUpdate({ 'agency': dataDestination.agency, 'account': dataDestination.account }, { 'balance' : dataDestination.balance }, { upsert: true }, function(err, docDest){

				if (err) {
	
					restController.response.errors.push({
						code : err.code,
						message : err.message
					});

				} else {

					restController.response.success = true;
					restController.response.result = docDest;

				}

				restController.finalizeWithResponse(res);

			});

		}

	});

}

module.exports = TransferController;