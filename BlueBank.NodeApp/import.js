var req = require('request');

var endPoint = 'http://localhost:3000/';

var accounts = [
		{ "agency" : "2001", "account": "0000001", "balance": 1000.10 },
		{ "agency" : "2002", "account": "0000002", "balance": 2000.20 },
		{ "agency" : "2003", "account": "0000003", "balance": 3000.30 },
		{ "agency" : "2004", "account": "0000004", "balance": 4000.40 },
		{ "agency" : "2005", "account": "0000005", "balance": 5000.50 },
		{ "agency" : "2006", "account": "0000006", "balance": 6000.60 },
		{ "agency" : "2007", "account": "0000007", "balance": 7000.70 },
		{ "agency" : "2008", "account": "0000008", "balance": 8000.80 },
		{ "agency" : "2009", "account": "0000009", "balance": 9000.90 }
	];

function insertAccount(data){

	console.log(data);
	
	var objAccount = {
		agency : data.agency,
		account : data.account,
		balance : data.balance
	};

	req({
	    url: endPoint + 'account', //URL to hit
	    qs: {}, //Query string data
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/json'
	    },
	    form: objAccount //Set the body as a string
	}, function(error, response, body){

		body = JSON.parse(body);

	    if (error) {
	        console.log(error);	
	    } else {
	    	if (body.success) {	    		
	    		//DO UPLOAD   
	    	}	   
	    }

	});

}

accounts.forEach(function(account){

	insertAccount(account);

})

// process.exit(0);