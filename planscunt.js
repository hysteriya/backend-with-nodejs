const planmodel=require('../models/plans');

module.exports.getallplans=async function getallplans (req, res){
    try{
    console.log('getallplanscalled');
    let allplans=await planmodel.find();
    if (allplans){
        res.json({message:'here are all the plans provided',
    data: allplans});
    }
    else{
        res.json({message:'plans not found'});
    }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getplan=async function getplan(req, res){
    try{
        let id=req.params.id;
        let plan=await planmodel.findById(id);
        if (plan){
            res.json({message:plan});
        }
        else{
            res.json('plan not found');
        }
    }
    catch(err){
        res.json({message:err});
        console.log(err);
    }
}

module.exports.createplan=async function createplan(req, res){
    try{
        let data=req.body;
        let plan=await planmodel.create(data);
        if (plan){
            res.json({
                message: 'plan created',
                data: data
            });
        }
        else{
            res.json('try again');
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:'error signing up'
        });
    }
}

module.exports.updateplan=async function updateplan(req, res){
    try{
        console.log('updateplan called');
        let id=req.params.id;
        let plan=await planmodel.findById(id);
        let update=req.body;
        if (plan){
            const keys=[];
            for (let data in update){
                keys.push(data);
            }
            for (i=0; i<keys.length; i++){
                plan[keys[i]]=update[keys[i]]
            }
            await plan.save();

            res.json({
                message:'data updated',
                data:plan
            });
        }
        else{
            res.json({message:'no plan found'});
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deleteplan= async function deleteplan(req, res){
    try{
        let id= req.params.id;
        await planmodel.findByIdAndDelete(id);
        res.json('data deleted');
        }
    catch(err){
        res.json({message:err});
    }
}

module.exports.topthreeplans=async function topthreeplans(req,res){
    try{
    const topthreeplans = await planmodel.find()
    .sort({ rating: -1 })
    .limit(3)
    .exec();
    return res.json({message: 'top three plans:', data:topthreeplans});
    }
    catch(err){
        res.json(err.message);
    }
}
