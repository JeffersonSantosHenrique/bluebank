var _accountController = require('../../business/components/account.controller');

function AccountService(app){

	// Load controller
	var accountController = new _accountController();

	// Configure services routes
	app.post('/account', accountController.postAccount);
	app.post('/account/checkAccount', accountController.getAccountByAgencyAndAccount);
	app.get('/account', accountController.getAccounts);
}

module.exports = AccountService;