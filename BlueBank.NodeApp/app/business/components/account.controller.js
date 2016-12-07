var _restController = require('./rest.controller'),
	errMessages = require('../../common/messages/error.messages'),
	AccountModel = require('../../data/account.model');

function AccountController(){}

AccountController.prototype.postAccount = function(req, res) {
	
	var restController = new _restController();

	//Get body data
	var _id = req.body._id;
	var data = {
		agency : req.body.agency,
		account : req.body.account,
		balance : req.body.balance
	};

	//Validate
	if (data.agency === undefined || data.agency === '') 
		restController.response.errors.push(errMessages.AGENCY_NULL);

	if (data.account === undefined || data.account === '') 
		restController.response.errors.push(errMessages.ACCOUNT_NULL);

	if (data.balance === undefined || data.balance < 0) 
		restController.response.errors.push(errMessages.BALANCE_NULL);

	if (restController.response.errors.length === 0 ){

		AccountModel.checkAccount({
			agency : data.agency,
			account : data.account,
			_id : _id
		}, function(err, exists){

			if (exists){
				
				restController.response.success = false;
				restController.response.errors.push(errMessages.ACCOUNT_EXISTS);
				restController.finalizeWithResponse(res);

			} else {

				var accountModel = new AccountModel(data);
				accountModel.save(function(err){

					if (err){
						
						restController.response.errors.push({
							code : err.code,
							message : err.message
						});

					} else {

						restController.response.success = true;
						restController.response.result = accountModel;

					}

					console.log('account saved', accountModel);
					restController.finalizeWithResponse(res);

				});
				
			}

		});

	} else {
		restController.finalizeWithResponse(res);
	}

}

AccountController.prototype.getAccounts = function(req, res) {

	var restController = new _restController();

	AccountModel.find({}, function(err, arrAccounts){

		if (err) {
			
			restController.response.errors.push({
				code : err.code,
				message : err.message
			});

		} else {
			
			restController.response.success = true;
			restController.response.result = arrAccounts;
		}

		restController.finalizeWithResponse(res);

	});

}

AccountController.prototype.getAccountByAgencyAndAccount = function(req, res) {

	var restController = new _restController();

	//Get body data	
	var data = {		
		agency : req.body.agency,
		account : req.body.account
	};

	//Validate
	if (data.agency === undefined || data.agency === '') 
		restController.response.errors.push(errMessages.AGENCY_NULL);

	if (data.account === undefined || data.account === '') 
		restController.response.errors.push(errMessages.ACCOUNT_NULL);

	if (restController.response.errors.length === 0 ){

		AccountModel.findAccount({
			agency : data.agency,
			account : data.account
		}, function(err, account){

			if (!account){
				
				restController.response.success = false;
				restController.response.errors.push(errMessages.ACCOUNT_NOT_FOUND);
				restController.finalizeWithResponse(res);

			} else {

				restController.response.success = true;
				restController.response.result = account;

				restController.finalizeWithResponse(res);
				
			}

		});

	} else {
		restController.finalizeWithResponse(res);
	}

}

module.exports = AccountController;