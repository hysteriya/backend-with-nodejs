const jwt=require('jsonwebtoken');
const seckey=require('../stayaway');



function protecc(req, res, next){
    if (req.cookies.loggedin){
        let verification=jwt.verify(req.cookies.loggedin, seckey);
        if (verification){
            next();
        }
        else {
            res.json({message:'pls dont hack ;_;'});
        }
        
    }
    else{
        res.json({message:'please login first'});
    }

}
module.exports=protecc;