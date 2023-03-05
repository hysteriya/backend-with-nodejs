const model = require('../models/usermodel');

module.exports.getallusers=async function getallusers(req, res){
    try{
    let allusers= await model.find();
    if(allusers){
    res.json({message:'all users presented sire',
    data: allusers});
    }
    else{
        res.send('users not found');
    }
    }
    catch (err){
        console.log(err);
    }
}

module.exports.getuser=async function getuser(req, res){
    try{
    console.log('getuser executed');
    let id=req.id;
    let user= await model.findById(id);
    if (user){
    return res.json({
        data:user
    });
    }
    else{
        res.json({
            message:"user not found"
        });
    }
}
    catch(err){
        console.log(err);
}

}

// function postuser(req, res){
//     users=req.body;
//     res.json({
//         message:'data recieved',
//         users:req.body
//     });
// }

module.exports.updateuser=async function updateuser(req, res){
    try{
    let id=req.params.id;
    let user= await model.findById(id);
    let update=req.body;
    if (user){
        const keys=[];
        for (let key in update){
            keys.push(key);
        }
        for(i=0; i<keys.length; i++){
            user[keys[i]]=update[keys[i]]
        }
        const updateddata= await user.save(); //what??

        res.json({
            message:'data updated',
            data:user
    
        });
    }
    else {
        res.json({
            message:'user not found'
        });
    }
}
    catch(err){
        console.log(err);
    }
    
}

module.exports.dltuser=async function dltuser(req, res){
    try {
    let id= req.params.id;
    let user= await model.findById(id);
    if (user){
    await model.findOneAndDelete(user);
    res.json('data deleted');
    }
    else {
        res.json('user to be deleted not found');
    }
}
    catch(err){
        console.log(err);
        res.json({ message:err.message});
    }
}

module.exports.updateProfileImage= function updateProfileImage(req, res){
    res.json({
        message:'file uploaded'
    });
}

// module.exports=getallusers;
// module.exports=getuser;
// module.exports=updateuser;
// module.exports=dltuser;
