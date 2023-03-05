const express=require('express');
const app=express();
const mongoose=require('mongoose');
mongoose.set('strictQuery', true);
var validator = require("email-validator");
const model=require('./models/usermodel');
const planmodel=require('./models/plans');
const userrouter=require('./routes/userroute');
const plansroute = require('./routes/plansroute');
const authrouter=require('./routes/authroute');
const cookieParser = require('cookie-parser');
const reviewRouter = require('./routes/reviewroute');
const bookingRouter=require('./routes/bookingroute');
const {sendMail}= require('./other/mailer');



app.use(express.json());

app.listen(3000, ()=>{
    console.log('server listening');
});


app.use(cookieParser());
app.use("/users", userrouter);
app.use("/auth", authrouter);
app.use("/plans", plansroute);
app.use('/review', reviewRouter);
app.use('/booking', bookingRouter);













