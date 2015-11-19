var mongoose=require('mongoose');
var security=require('../support/security.js');
mongoose.connect("mongodb://localhost/login_datastore");

var loginCollection = require('../model/loginModel.js');
module.exports = function(app, express) {

	var api =  express.Router();

	api.post('/register/',function(req,res){
		console.log(req.body);
		var registerModel = new loginCollection();
		registerModel.userName = req.body.userName;
		var salt=security.createSalt();
		var pwd=security.hashPwd(salt,req.body.password);
		registerModel.password = pwd;
		registerModel.salt = salt;
		console,log("saving\n"+registerModel);
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

	api.post('/login/',function(req,res){
		loginCollection.find({"userName":req.body.userName},function(err,doc){
			if(err){
				res.send(err);
			}else{
				if(doc!=""){
					console.log(doc);
					if(doc.authenticate(req.body.password)){
						res.send("Login Successfull!");
					}else{
						res.send("Incorrect password!")
					}
				}else{
					res.send("User Does not exist!");
				}
			}
		});
	});

	return api;
}
