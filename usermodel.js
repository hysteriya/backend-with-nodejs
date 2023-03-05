const mongoose=require('mongoose');
mongoose.set('strictQuery', true);
var validator = require("email-validator");
const bcrypt = require('bcrypt');
const crypto= require('crypto');




const link = 'mongodb+srv://admin:GUngD7N0edK7y1Tx@cluster0.fp8pacy.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(link)
.then(function(db){
    console.log(db);
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
});

const schema=mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: function(){
            return validator.validate(this.email);
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    role:{
        type: String,
        enum: ['admin', 'mafia', 'peddler', 'customer'],
        default:'customer'
    },
    profileimg:{
        type:String,
        default: 'img/users/default.jpeg'
    },
    resetpasstoken:{
        type: String
    }
    
});

//creating schema methods
schema.methods
.createresettoken=function (){
    const resettoken=crypto.randomBytes(16).toString('hex');
    schema.resetpasstoken=resettoken;
    return resettoken;
}
.resetpasshandler= function(password, confirmpassword){
    schema.password=password;
    schema.resetpasstoken=undefined;
}

// schema.pre('save', async function(){
//     let salt= await bcrypt.genSalt();
//     let hashed= await bcrypt.hash(this.password, salt);
//     this.password=hashed;

// })

const model=mongoose.model('model', schema);
module.exports=model;