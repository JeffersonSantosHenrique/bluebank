var mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	express = require('express'),
	app = express();

function API(){

	app.set('views', __dirname + '/presentations');
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'ejs');

	app.use('/public', express.static('public'));
	app.use('/views', express.static(__dirname + '/presentations/views'));

	app.get('/', function (req, res) { res.sendStatus(404) });
	app.get('/transfer', function (req, res) { res.render('index.html'); });

	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json());

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	var conn = process.env.MongoConnectionString || 'mongodb://localhost/db_bluebank';
	mongoose.connect(conn);
	
	var db = mongoose.connection;
	db.once('open', function() { console.log('DB connected using:', conn); });
	db.on('error', console.error.bind(console, 'connection error:'));

	//Call all services
	require('./webservices/services/account.service')(app);
	require('./webservices/services/transfer.service')(app);
	
	var port = process.env.PORT || 3000;
	app.listen(port, function () {
		console.log('Blue Bank is runing in port ' + port + '!!!');
	});
	
}

module.exports = new API();