const mongoose = require("mongoose");
const validator = require("validator");

//const _ = require('lodash');

var UserSchema = new mongoose.Schema({
	email:{
		type:String,
		required:true,
		minlength:1,
		trim:true,
		unique:true,
		validate:{
			// validator:(value) =>{
			// 	return validator.isEmail(value);
			// },
			validator:validator.isEmail,
			message: '{VALUE} is not a valid email.'
		}
	},
	name:{
		type:String,
		required:true,
		minlength:1,
		trim:true,
	},
	gender:{
		type:String,
		required:true,
		minlength:1
	},
	dob:{
		type:Date,
		required:true,
	},
	phone:{
		type:Number,
		required:true,
		minlength:1,
	},
});
var User = mongoose.model('User',UserSchema);

module.exports={
	User
}