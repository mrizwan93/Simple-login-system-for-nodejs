var mongoose=require('mongoose');
var security=require('../support/security.js');
var loginModel=new mongoose.Schema({
	userName:{type: String, unique : true,sparse:true},
	password:{type:String},
	salt:{type:String}
});

loginModel.methods.authenticate=function(passwordToMatch){
	return security.hashPwd(this.salt,passwordToMatch)=== this.password;
}
module.exports= mongoose.model('loginCollection',loginModel);
