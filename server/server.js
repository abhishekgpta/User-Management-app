require("./config/config.js");

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const app = express();
const PORT = process.env.PORT||8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const publicPath = path.join(__dirname,"../client/public");
app.use(express.static(publicPath));
app.post("/add_user",(req,res)=>{
	let data = {name:req.body.name,email:req.body.email,gender:req.body.gender,phone:req.body.phone,dob:req.body.date}
	var user = new User(data);
	user.save().then((data)=>{return data},(err)=>{
		res.status(400).send(err);
	}).then((status)=>{return res.send({data,status})}).catch((e)=>{
		res.status(400).send();
	});
});

app.get("/add_user",(req,res)=>{
	res.send("hi");
});

app.get("/user",(req,res)=>{
	User.find({}, function(err, users) {
	    var userMap = {};
	    res.send(users);  
	});
});


const server = app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));