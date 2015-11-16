var express= require('express'),
    bodyParser=require('body-parser');
var app=express();
var port=process.env.PORT || 3000;
app.use(bodyParser.json({}));
 app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

var api = require('./routes/routes.js')(app, express);
app.use('/api', api);

var server = app.listen(port, function () {
  var host = server.address().address;
  console.log('server listening at http://%s:%s', host, port);
});

process.on('uncaughtException', function(err) {
    console.log(err);
});
