const mongoose=require('mongoose');
mongoose.set('strictQuery', true);

const link = 'mongodb+srv://admin:GUngD7N0edK7y1Tx@cluster0.fp8pacy.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(link)
.then(function(db){
    console.log('plans db connected');
})
.catch(function(err){
    console.log(err);
});

const planschema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique:true,
        maxlength:[20, 'max length for planname is 20']
    },
    duration:{
        type: String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type: Number
    }
});

const planmodel=mongoose.model('planmodel', planschema);

// (async function createplan(){
//     const planobj={
//         planname: 'noob',
//         duration: '1 month',
//         price: 1200
//     }
//     const doc= new planmodel(planobj);
//     await doc.save();
//     console.log(planobj);
//     //alternate method:
//     //let doc= await planmodel.create(planobj);
// })(); //() to immediately invoke functions



module.exports=planmodel;