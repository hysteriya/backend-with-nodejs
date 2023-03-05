const express=require('express');
const app=express();
const cookieParser = require('cookie-parser');
const model=require('../models/usermodel.js');
const jwt=require('jsonwebtoken');
const seckey=require('../stayaway');



app.use(cookieParser());
const authrouter=express.Router();
app.use("/auth", authrouter);



// authrouter
// .route("/signup")
// .get(getauth)
// .post(postauth);

// authrouter
// .route("/login")
// .post(login);



function getauth(req, res){
    res.sendFile('signup.html', {root:__dirname});
}

async function postauth(req, res){
    let obh=req.body;
    let user= await model.create(obh);
    res.json({
        message:'signed up',
        data:obh
    });
    console.log(user);
}




module.exports=authrouter;