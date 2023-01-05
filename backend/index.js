require('dotenv').config();
const stripe = require('stripe')('sk_test_51LD42cSJb05mAKIhulGhSsRo6e7v8OAA4IdkNBkCQPwIacUSOFybWXogCp3m1aDJ3CGrKvsPIk6gS2hGGJbAwjjN00LEG1yqfb');
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
app.use(cors());
var nodemailer = require('nodemailer');
app.use(express.static('public'));
const mongoose = require('mongoose');
const User = require('./models/users');
const Otp = require('./models/otp');
const Insta_accounts = require('./models/insta_accounts');
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


app.post('/send_email',jsonParser,(req,res)=>{
    if(req.body.sub==="purchased"){
        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'qa.pamsar@gmail.com',
                pass:'tsjfvhxxgsibzayh'
            }
        })
        var mailOptions = {
            from: 'qa.pamsar@gmail.com',
            to: req.body.email,
            subject: 'Payment made in Hawkeye',
            text: `Made a payment of $19 in Hawkeye and purchased the freelancer plan`
        }
        transporter.sendMail(mailOptions, function(error,info){
            if(error){
                console.log(error);
                res.send({'msg':'Email Sent Unsuccessfully'});
            }
            else{
                console.log('Email sent: '+info.response);
                res.send({'msg':'Email Sent Successfully'});
            }
        })
    }
    else{
        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'qa.pamsar@gmail.com',
                pass:'tsjfvhxxgsibzayh'
            }
        })
        var mailOptions = {
            from: 'qa.pamsar@gmail.com',
            to: req.body.email,
            subject: 'Payment made in Hawkeye',
            text: `You have cancelled your subscription plan successfully on Hawkeye`
        }
        transporter.sendMail(mailOptions, function(error,info){
            if(error){
                console.log(error);
                res.send({'msg':'Email Sent Unsuccessfully'});
            }
            else{
                console.log('Email sent: '+info.response);
                res.send({'msg':'Email Sent Successfully'});
            }
        })
    }
    
})

const multer = require('multer');
const { json } = require('express');
  
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+path.extname(file.originalname))
        console.log("orignal name=",file.originalname)
    }
});
  
var upload = multer({ storage: storage });
app.post('/user_details',jsonParser,(req,res)=>{
    User.findOne({email:req.body.email}).then(async (data)=>{
        res.send({"user_details":data})
    })
})
app.post('/update_profile_image',jsonParser,upload.single('image'),(req,res,next)=>{
    User.findOne({ email: req.body.email }).then(async (data) => {
        await User.updateOne({email: req.body.email},{
            $set:{
                updated_profile_img: {
                    data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                    contentType: 'image/png'
                },
            }
        })
        res.send({"msg":"Profile image updated Successfull"});
    })
})
app.post('/update_profile',jsonParser, (req, res, next) => {
    console.log("file name=",req.body.email);
    User.findOne({ email: req.body.email }).then(async (data) => {
                    await User.updateOne({email: req.body.email},{
                        $set:{
                            location: req.body.location,
                            occupation: req.body.occupation,
                            fname:req.body.first_name,
                            lname:req.body.last_name,
                            about_me:req.body.about_me,
                            website:req.body.website,
                            
                        }
                    })
                    res.send({"msg":"Profile updated Successfull","email":req.body.email});
    })
});

app.post('/create_otp_collection',jsonParser,async(req,res)=>{
    Otp.findOne({ email: req.body.email }).then(async (data) => {
        if(data){
            res.send({"msg":"new otp collection cannot be created because this email already exists in the collection"})
        }
        else{
            const create_otp_collection = new Otp({
                email: req.body.email,
                otp: "",
            })
            create_otp_collection.save().then((result) => {
                console.log("result",result);
                    res.status(201).send({"msg":"Otp Collection Created successfully"});
            }).catch((err) => console.log(err));
        }
    })
})

app.post('/send_update_otp',jsonParser,async(req,res)=>{
    Otp.findOne({ email: req.body.email }).then(async (data) => {
        if(data){
            var transporter = nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:'qa.pamsar@gmail.com',
                    pass:'tsjfvhxxgsibzayh'
                }
            })
            var mailOptions = {
                from: 'qa.pamsar@gmail.com',
                to: req.body.email,
                subject: 'OTP for Hawkeye',
                text: `This is the otp to change your password `+req.body.otp+` the otp will expire after 1 minute`
            }
            transporter.sendMail(mailOptions, function(error,info){
                if(error){
                    console.log(error);
                    res.send({'msg':'Email Sent Unsuccessfully'});
                }
                else{
                    console.log('Email sent: '+info.response);
                    res.send({'msg':'Email Sent Successfully'});
                }
            })
            await Otp.updateOne({email: req.body.email},{
                $set:{
                    otp : req.body.otp
                }
            })
        }
        else{
            res.send({"msg":"No such email id exists with us."});
        }
    })
})

app.post('/expire_otp',jsonParser,async (req,res)=>{
    Otp.findOne({ email: req.body.email }).then(async (data) => {
        if(data){
            await Otp.updateOne({email: req.body.email},{
                $set:{
                    otp : ""
                }
            })
        }
        else{
            res.send({"msg":"No such email id exists with us."});
        }
    })
})

app.post('/new_password',jsonParser,async(req,res)=>{
    User.findOne({ email: req.body.email }).then((data) => {
        if(data){
            var password = req.body.password;
    var hashedPassword;
    // Encryption of the string password
    bcrypt.genSalt(10, function (err, Salt) {
  
    // The bcrypt is used for encrypting password.
    bcrypt.hash(password, Salt, async function (err, hash) {
  
        if (err) {
            console.log('Cannot encrypt');
        }
        hashedPassword = hash;
        console.log("hash",hash);
        await User.updateOne({email: req.body.email},{
            $set:{
                password : hashedPassword
            }
        })
        res.send({"msg":"Password changed successfully"});
    })
})
        }
        else{
            res.status(200).send({"msg":"No such Email exists with us"});
        }
    })
})

app.post('/get_otp',jsonParser, async (req,res)=>{
    Otp.findOne({ email: req.body.email }).then(async (data) => {
        if(data){
            if(data.otp===""){
                res.send({"msg":"OTP expired"})
            }
            else{
                res.send({"msg":data.otp})
            }
        }
        else{
            res.send({"msg":"No such email id exists with us."})
        }
    })
})

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

app.post('/get_cust_id',jsonParser,async(req,res)=>{
    User.findOne({ email: req.body.email }).then(async (data) => {
        console.log("get customer id::",data);
        res.send({"msg":"Subscription cancelled successfully"});
    })
})

app.post('/save_cust_id',jsonParser,async(req,res)=>{
    User.findOne({ email: req.body.email }).then(async (data) => {
        if(data){
            await User.updateOne({email: req.body.email},{
                $set:{
                    cust_id : req.body.ci
                }
            })
        }
    })
})

app.post('/list_subscription', jsonParser,async(req,res)=>{
    let stripeSub = await stripe.subscriptions.list({customer: req.body.ci});
    res.send(stripeSub);
})

app.post('/save_subscription_id',jsonParser,async(req,res)=>{
    await User.updateOne({email: req.body.email},{
        $set:{
            sub_id : req.body.sub_id
        }
    })
    res.send({"msg":"subscription id saved successfully"});
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

app.post('/cancel_subscription',jsonParser,async(req,res)=>{
    User.findOne({ email: req.body.email }).then(async (data) => {
        await User.updateOne({email: req.body.email},{
            $set:{
                plan:"Null",
                sub_id:""
            }
        })
        res.send({"msg":"Subscription cancelled successfully"});
    })
})

app.post('/get_plans',jsonParser,function (req, res) {
    User.findOne({ email: req.body.email }).then((data) => {
        if(data){
            res.send({"plan":data.plan})
        }
        if(!data){
            res.send({"msg":"No such email exists with hawkeye"});
        }
    })
        
    })
app.post('/get-profile-image',jsonParser,async(req,res)=>{
    User.findOne({email: req.body.email}).then(async (data)=>{
        if(data.updated_profile_img===""){
            res.send({"msg":"show default avatar"});
        }
        else{
            res.send({"updated_profile_image":data.updated_profile_img});
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
        //console.log("data",data.password)
        if(data){
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
                    res.status(200).send({"msg":"Login Successfull"});
                }
      
                if (!isMatch) {
                    res.status(400).send({"msg":"EmailID and Password Does'nt Match"});
                }
            })
        }
        else{
            res.status(200).send({"msg":"Email not registered with us."});
        }
    })
})
app.post('/register', jsonParser, function (req, res) {
    User.findOne({ email: req.body.email }).then((data) => {
        if(data){
            res.status(200).send({"msg":"Email already exists"});
        }
        else{
            
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
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: hashedPassword,
            location: "",
            occupation: "",
            website: "",
            about_me: "",
            token:"0",
            plan:"Null", 
            sub_id:"",
            cust_id:"",
            updated_profile_img: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + "default_avatar.jpg")),
                contentType: 'image/png'
            },
        })
        data.save().then((result) => {
            console.log("result",result);
                res.status(201).send({"msg":"registration successfull"});
        }).catch((err) => console.log(err));
    })
})
        }
    })
})
app.post('/get_insta_accounts',jsonParser,(req,res)=>{
    Insta_accounts.findOne({email:req.body.email}).then(async (data)=>{
        res.send({"data from get insta accounts":data});
    })
})
app.post('/fill_insta_accounts',jsonParser,(req,res)=>{
    Insta_accounts.findOne({email:req.body.email}).then(async (data)=>{
        if(req.body.sno===1){
            console.log("runing1")
            await Insta_accounts.updateOne({email: req.body.email},{
                $set:{
                    ig_id_1:req.body.ig_id,
                    access_token_1:req.body.access_token,
                }
            })
        }
        else if(req.body.sno===2){
            console.log("runing2")
            await Insta_accounts.updateOne({email: req.body.email},{
                $set:{
                    ig_id_2:req.body.ig_id,
                    access_token_2:req.body.access_token,
                }
            })
        }
        else if(req.body.sno===3){
            await Insta_accounts.updateOne({email: req.body.email},{
                $set:{
                    ig_id_3:req.body.ig_id,
                    access_token_3:req.body.access_token,
                }
            })
        }
        else if(req.body.sno===4){
            await Insta_accounts.updateOne({email: req.body.email},{
                $set:{
                    ig_id_4:req.body.ig_id,
                    access_token_4:req.body.access_token,
                }
            })
        }
        else if(req.body.sno===5){
            await Insta_accounts.updateOne({email: req.body.email},{
                $set:{
                    ig_id_5:req.body.ig_id,
                    access_token_5:req.body.access_token,
                }
            })
        }
        res.send({"msg":"Successfully filled insta accounts"})
    })
})
app.post('/space_for_insta_accounts',jsonParser,(req,res)=>{
        Insta_accounts.findOne({email:req.body.email}).then((data1)=>{
            if(data1){
                res.send({"msg":"Insta Accounts allocation already created"});
            }
            else{
                User.findOne({ email: req.body.email }).then((data) => {
                    if(data){
                        const data = new Insta_accounts({
                            email:req.body.email,
                            account_1:"Account 1",
                            ig_id_1:"",
                            access_token_1:"",
                            account_2:"Account 2",
                            ig_id_2:"",
                            access_token_2:"",
                            account_3:"Account 3",
                            ig_id_3:"",
                            access_token_3:"",
                            account_4:"Account 4",
                            ig_id_4:"",
                            access_token_4:"",
                            account_5:"Account 5",
                            ig_id_5:"",
                            access_token_5:""
                    })
                    data.save().then((result) => {
                        console.log("result",result);
                            res.status(201).send({"msg":"insta accounts allottion created successfully"});
                    }).catch((err) => console.log(err));
                    }
                    else{
                        res.send({"msg":"No such email id exists with hawkeye"});
                    }
                })
            }
        })
})
app.post('/user_current_plan',jsonParser,(req,res)=>{
    User.findOne({email:req.body.email}).then(async (data)=>{
        console.log("data=",data);
        res.send({"user_current_plan":data})
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
app.post('/edit_name',jsonParser,async (req,res)=>{
    if(req.body.edit_for==="account_1"){
        Insta_accounts.findOne({email:req.body.email}).then(async (data)=>{
            await Insta_accounts.updateOne({email: req.body.email},{
                $set:{
                    account_1: req.body.name
                }
            })
            res.send({"msg":"name updated successfully"});
        })
    }
    if(req.body.edit_for==="account_2"){
        Insta_accounts.findOne({email:req.body.email}).then(async (data)=>{
            await Insta_accounts.updateOne({email: req.body.email},{
                $set:{
                    account_2: req.body.name
                }
            })
            res.send({"msg":"name updated successfully"});
        })
    }
    if(req.body.edit_for==="account_3"){
        Insta_accounts.findOne({email:req.body.email}).then(async (data)=>{
            await Insta_accounts.updateOne({email: req.body.email},{
                $set:{
                    account_3: req.body.name
                }
            })
            res.send({"msg":"name updated successfully"});
        })
    }
    if(req.body.edit_for==="account_4"){
        Insta_accounts.findOne({email:req.body.email}).then(async (data)=>{
            await Insta_accounts.updateOne({email: req.body.email},{
                $set:{
                    account_4: req.body.name
                }
            })
            res.send({"msg":"name updated successfully"});
        })
    }
    if(req.body.edit_for==="account_5"){
        Insta_accounts.findOne({email:req.body.email}).then(async (data)=>{
            await Insta_accounts.updateOne({email: req.body.email},{
                $set:{
                    account_5: req.body.name
                }
            })
        })
        res.send({"msg":"name updated successfully"});
    }
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
