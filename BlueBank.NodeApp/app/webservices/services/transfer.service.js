var _transferController = require('../../business/components/transfer.controller');

function TranferService(app){

	// Load controller
	var transferController = new _transferController();

	// Configure services routes
	app.post('/transfer', transferController.postTransfer);
}

module.exports = TranferService;