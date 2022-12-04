require('dotenv').config();
const stripe = require('stripe')('sk_test_51LD42cSJb05mAKIhulGhSsRo6e7v8OAA4IdkNBkCQPwIacUSOFybWXogCp3m1aDJ3CGrKvsPIk6gS2hGGJbAwjjN00LEG1yqfb');
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.static('public'));
const mongoose = require('mongoose');
const User = require('./models/users');
const Following = require('./models/following');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { rmSync } = require('fs');
var imgModel = require('./models/users');
const jwtKey = "jwt";
var jsonParser = bodyParser.json();
mongoose.connect(process.env.connecting_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected");
})

var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });

app.post('/update_profile_image', upload.single('image'), (req, res, next) => {
    User.findOne({ email: req.body.email }).then(async (data) => {
                    await User.updateOne({email: req.body.email},{
                        $set:{
                            updated_profile_img: {
                                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                                contentType: 'image/png'
                            }
                        }
                    })
    })
    res.send({"msg":"Profile image updated Successfull"});
});

app.post('/create-checkout-session', jsonParser, async (req, res)=> {
    const session = await stripe.checkout.sessions.create({
        success_url: process.env.success_url,
        cancel_url: process.env.cancel_url,
        line_items: [
          {price: req.body.price_id, quantity: 1},
        ],
        mode: 'subscription',
      });
    console.log("session",session);
    res.send(session);
})
app.get('/payment_lists',async(req,res)=>{
    const paymentIntents = await stripe.paymentIntents.list({
      });
      res.send(paymentIntents);
})
app.post('/customer_details', jsonParser, async(req, res)=>{
    const customer = await stripe.customers.retrieve(
        req.body.customer
      );
      res.send(customer);
})
app.post('/save_subscription', jsonParser, async(req, res)=>{
    let suscribed_plan="Null"
    if(req.body.amount===1900){
    console.log("email",req.body.email);
    console.log("amount",req.body.amount);
       suscribed_plan = "Freelancer";
       console.log(suscribed_plan)
    }
    else if(req.body.amount===2400){
        suscribed_plan = "Agency";
     }
     else if(req.body.amount===3400){
        suscribed_plan = "Enterprise";
     }
    await User.updateOne({email: req.body.email},{
        $set:{
            plan : suscribed_plan
        }
    })
    res.send({"suscription":"success"});
})
app.post('/get_plans',jsonParser,function (req, res) {
    User.findOne({ email: req.body.email }).then((data) => {
        res.send({"plan":data.plan})
    })
        
    })
app.post('/set-profile-image',jsonParser,async(req,res)=>{
    User.findOne({ email: req.body.email }).then(async (data) => {
        if(data.insta_profile_image==="" && data.updated_profile_img===""){
            await User.updateOne({email: req.body.email},{
                $set:{
                    insta_profile_image : req.body.profile_image
                }
            })
            console.log("requested profile image=",req.body.profile_image);
            res.send({"msg":"image set"});
        }
        else{
            if(data.updated_profile_img!==""){
                res.send({"profile_image":data.updated_profile_img});
            }
            else{
                res.send({"profile_image":data.profile_image});
            }
        }
    })
})
app.post('/customer_details', jsonParser, async(req, res)=>{
    const customer = await stripe.customers.retrieve(
        req.body.customer
      );
      res.send(customer);
})
app.post('/login', jsonParser, function (req, res) {
    User.findOne({ email: req.body.email }).then((data) => {
        console.log("data",data.password)
        bcrypt.compare(req.body.password, data.password, 
            async function (err, isMatch) {
            // Comparing the original password to
            // encrypted password   
            if (isMatch) {
                /*jwt.sign({ data }, jwtKey, { expiresIn: '30000s' }, async (err, token) => {
                    await User.updateOne({email: req.body.email},{
                        $set:{
                            token : token
                        }
                    })
                    res.status(200).send({"msg":"Login Successfull","jwt":token});
                })*/
                 res.status(200).send({"msg":"Login Successfull","jwt":token});
            }
  
            if (!isMatch) {
                res.status(400).send({"msg":"EmailID and Password Does'nt Match"});
            }
        })
    })
})
app.post('/register', jsonParser, function (req, res) {
    var password = req.body.password;
    var hashedPassword;
    // Encryption of the string password
    bcrypt.genSalt(10, function (err, Salt) {
  
    // The bcrypt is used for encrypting password.
    bcrypt.hash(password, Salt, function (err, hash) {
  
        if (err) {
            console.log('Cannot encrypt');
        }
  
        hashedPassword = hash;
        console.log("hash",hash);
        const data = new User({
            _id: mongoose.Types.ObjectId(),
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: hashedPassword,
            token:"0",
            plan:"Null", 
            insta_profile_image:"",
            updated_profile_img:""
        })
        data.save().then((result) => {
            console.log("result",result);
                res.status(201).send({"msg":"registration successfull"});
        }).catch((err) => console.log(err));
    })
})
})
app.get('/users', verifyToken, function (req, res) {
    User.find().then((result) => {
        res.status(200).json(result);
    })
})
app.post('/get_following', jsonParser,(req,res)=>{
    Following.findOne({ user_id: req.body.id }).then(async (data) => {
        if(data){
            res.send(data);
        }
        else{
            res.send({"msg":"No data found"});
        }
    })
});
app.post('/save_following', jsonParser,async (req,res)=>{
    Following.findOne({ user_id: req.body.id }).then(async (data) => {
        console.log("data",data);
        if(!data){
            const data = new Following({
                user_id:req.body.id,
                following_day1:0,
                following_day2:0,
                following_day3:0,
                following_day4:0,
                following_day5:0,
                following_day6:0,
                following_day7:0,
                following_day8:0,
                following_day9:0,
                following_day10:0,
                following_day11:0,
                following_day12:0,
                following_day13:0,
                following_day14:0,
                following_day15:0,
                following_day16:0,
                following_day17:0,
                following_day18:0,
                following_day19:0,
                following_day20:0,
                following_day21:0,
                following_day22:0,
                following_day23:0,
                following_day24:0,
                following_day25:0,
                following_day26:0,
                following_day27:0,
                following_day28:0,
                following_day29:0,
                following_day30:req.body.f_change,
                total_following:req.body.total,
                following_previous_month:0
            })
            data.save().then((result) => {
            console.log("result",result);
            res.status(201).send({"msg":"Folling saved Successfully"});
            }).catch((err) => console.log(err));
        }
        else{
            console.log("req body",req.body)
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day1:req.body.f2,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day2:req.body.f3,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day3:req.body.f4,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day4:req.body.f5,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day5:req.body.f6,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day6:req.body.f7,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day7:req.body.f8,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day8:req.body.f9,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day9:req.body.f10,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day10:req.body.f11,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day11:req.body.f12,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day12:req.body.f13,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day13:req.body.f14,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day14:req.body.f15,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day15:req.body.f16,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day16:req.body.f17,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day17:req.body.f18,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day18:req.body.f19,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day19:req.body.f20,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day20:req.body.f21,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day21:req.body.f22,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day22:req.body.f23,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day23:req.body.f24,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day24:req.body.f25,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day25:req.body.f26,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day26:req.body.f27,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day27:req.body.f28,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day28:req.body.f29,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day29:req.body.f30,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_day30:req.body.f_change,
                }
            })
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                total_following:req.body.total,
                }
            })
            
        data.save().then((result) => {
            console.log("result",result);
            res.status(201).send({"msg":"Folling updated Successfully"});
            }).catch((err) => console.log(err));
        }
    })
})
app.post('/save_following_month_p', jsonParser,async (req,res)=>{
    console.log("id",req.body.id);
    Following.findOne({ user_id: req.body.id }).then(async (data) => {
        console.log("data",data);
        if(data){
            console.log("req body",req.body)
            await Following.updateOne({user_id: req.body.id},{
                $set:{
                following_previous_month:req.body.following_previous_month,
                }
            })
        data.save().then((result) => {
            console.log("result",result);
            res.status(201).send({"msg":"Following previous month updated Successfully"});
            }).catch((err) => console.log(err));
        }
    })
})
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        console.log(bearer[1]);
        req.token = bearer[1];
        jwt.verify(req.token, jwtKey, (err, authData) => {
            if (err) {
                res.json({ result: err })
            }
            else {
                next();
            }
        })
    }
    else {
        res.send({ "result": "Token not provided" });
    }
}
app.listen(5000, () => {
    console.log("app is running on port 5000");
});
