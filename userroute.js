const express=require('express');
const multer=require('multer');
const userrouter= express.Router();
const app=express();
const {getallusers,getuser,updateuser,dltuser,updateProfileImage}=require('../cuntroller/usercunt.js');
const {signup,login,checkrole,protecc, forgetpass, resetpass, logout}=require('../cuntroller/authcunt');
const {sendMail}= require('../other/mailer');

app.use('/users', userrouter);


userrouter
.route('/:id')
.patch(updateuser)
.delete(dltuser);

userrouter
.route('/signup')
.post(signup);

userrouter
.route('/login')
.post(login);

userrouter
.route('/forgetpass')
.post(forgetpass);

userrouter
.route('/resetpassword/:token')
.post(resetpass);

userrouter
.route('/logout')
.get(logout);

//multerfuctions
const multerstorage=multer.diskStorage({
    destination:function(req, file, cb){
        cb(null,'C:/Users/riya5/OneDrive/Documents/aywut/node js/storage/images');
    },
    filename:function(req,file,cb){
        cb(null, `user-${Date.now()}.jpeg`);
    }
});
const filter= function (req, file, cb){
    if (file.mimetype.startsWith("image")){
        cb(null,true);
    }
    else{
        cb(new Error('upload image'));
    }
}
const upload = multer({
    storage:multerstorage,
    fileFilter: filter
});

//html file -> form: 1. action (route) 2. method(html method) 3. name (instance name)
userrouter
.post("/ProfileImage", upload.single('photo') ,updateProfileImage)
.get('/ProfileImage',(req,res)=>{
      res.sendFile("C:/Users/riya5/OneDrive/Documents/aywut/node js/multer.html");
  });

userrouter.use(protecc);
userrouter
.route('/userprofile')
.get(getuser);

//userrouter.use(checkrole(['admin']));
userrouter
.route('/allusers')
.get(checkrole(['admin']), getallusers);



module.exports=userrouter;