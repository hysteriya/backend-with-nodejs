const express=require('express');
const plansroute=express.Router();
const app=express();
const {protecc, checkrole}= require('../cuntroller/authcunt');
const {getallplans, getplan, createplan, updateplan, deleteplan, topthreeplans}= require('../cuntroller/planscunt');

app.use('/plans', plansroute);

plansroute
.route('/allplans')
.get(getallplans);

plansroute
.route('/topthree')
.get(topthreeplans);

//for own plan
plansroute.use(protecc);
plansroute
.route('/:id')
.get(getplan)
.patch(checkrole(['admin', 'peddler']), updateplan)
.delete(checkrole(['admin', 'peddler']), deleteplan);

//plansroute.use(checkrole['admin', 'peddler']);
plansroute
.route('/')
.post(checkrole(['admin', 'peddler']), createplan);




module.exports=plansroute;



