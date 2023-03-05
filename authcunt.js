const express=require('express');
const app=express();
const model=require('../models/usermodel.js');
const jwt=require('jsonwebtoken');
const crypto = require('crypto');
const seckey = crypto.randomBytes(32).toString('hex');
const {sendMail}= require('../other/mailer');

//const seckey=require('../stayaway');


//signup
module.exports.signup=async function signup(req, res){
    try{
    let obj=req.body;
    let user= await model.create(obj);
    if (user){
        sendMail("signup", user);
        res.json({
            message:'signed up',
            data:obj
        });
        console.log(user);
    }
    else {
        res.json('input feilds properly to signup');
    }
}
    catch(err){
        console.log(err);
        res.status(500).json({
            message:'error signing up'
        });
    }
}

//login
module.exports.login=async function login (req, res){
    try{
    let obj=req.body;
    let emailrequested=obj.email;
    let passwordreq=obj.password;
    let user=await model.findOne({email:emailrequested});
    
    if (user){
        let dbpassword=user.password;
        if(dbpassword==passwordreq){
            let uid=user['_id']; //unique id
            let token=jwt.sign({payload:uid}, seckey);
            res.cookie('loggedin', token, {httpOnly: true});
            return res.json({message: 'logged in successfully'});
        }
        else if (dbpassword!==passwordreq){
            return res.json({message: 'password error'});
        }
        else{
            
            return res.json({message:'error'});
        }
    }
    else{
        return res.json({message:'not found'});
    }
}

catch(err){
    return res.json({message:err.message});
    
}

}

//role
module.exports.checkrole=function checkrole(roles){
    return function(req,res,next){
        if (roles.includes(req.role)==true){
            next();
        }
        else{
            res.status(401).json('op not allowed');
        }
    }
}

//protecc
module.exports.protecc=async function protecc(req, res, next){
    try{
    if (req.cookies.loggedin){
        let token=req.cookies.loggedin;
        let payload=jwt.verify(token, seckey);
        if(payload){
            console.log('payload', payload);
            const user=await model.findById(payload.payload);
            console.log(user);
            req.role=user.role;
            req.id=user.id;
            next();
            
        }
        else{
            return res.json({
                message:'why you hacking'
            });
        }
        

    }
    else{
        //for browser clients
        const client=req.get('user-agent');
        if (client.includes("Mozilla")){
            return redirect ('/login');
        }
        else{
        //for postman
        res.json({message:'please login first'});
        }
    }
}
    catch(err){
        res.json({
            message:err.message
        });
    }
    

}

//forget password
module.exports.forgetpass=async function forgetpass(req, res){
    try{
        let emailreq=req.body;
        const user= await model.findOne({email:emailreq});
        if (user){
            const resettoken= user.createresettoken();
            //creating full url exp
            let resetpasslink=req.protocol+'://'+req.get('host')+'/resetpass'+resettoken;
            // send email to the user by nodemailer
            let obj={
                resetPasswordLink: resetpasslink,
                email: emailreq
            }
            sendMail("resetpassword", obj);
        }
        else{
            return res.json({message:'user not found'});
        }

    }
    catch(err){
        res.json({message:err.message});
    }
}

//reset password
module.exports.resetpass=async function resetpass(req, res){
    try {
    let token=req.params.token;
    let {password, confirmpassword}=req.body;
    const user= await model.findOne({resettoken:token});
    if (password==confirmpassword){
        if (user){
            //model function that will update pass in db
            user.resetpasshandler(password, confirmpassword);
            await user.save();
            res.json({message:'pass was reset'});
        }
        else{
            res.json({message:'user was not found'});
        }
    }
    else{
        res.json({message:'passwords dont match'});

    }
}
    catch(err){
        console.log(err);
    }
    

    }

//logout
module.exports.logout=function logout(req, res){
    //method -> cookie name, value, constrain
    res.cookie('loggedin', ' ', {maxAge:1});
    res.json({message:'logged out successfully'});
    //return login page res.redirect
}


