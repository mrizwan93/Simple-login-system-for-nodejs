var mongoose=require('mongoose');
var security=require('../support/security.js');
mongoose.connect("mongodb://localhost/login_datastore");

var loginCollection = require('../model/loginModel.js');
module.exports = function(app, express) {

	var api =  express.Router();

	api.post('/register/',function(req,res){
		var registerModel = new loginCollection();
		registerModel.userName = req.body.userName;
		var salt=security.createSalt();
		var pwd=security.hashPwd(salt,req.body.password);
		registerModel.password = pwd;
		registerModel.salt = salt;
		registerModel.save(function(err,doc){
			if(err){
				res.send(err);
			}else{
				res.send({
					"msg":"User Registered!"
				});
			}
		});
	});

	return api;
}
