const express=require('express');
const bookingRouter=express.Router();
//app.use("/booking", bookingRouter);
const {protecc}=require('../cuntroller/authcunt');
const {createSession}=require('../cuntroller/bookingcunt');

bookingRouter
.route('/createsession')
.post(protecc,createSession)
.get(function(req,res){
    res.sendFile("C:/Users/riya5/OneDrive/Documents/aywut/node js/other/booking.html");
});

module.exports=bookingRouter;