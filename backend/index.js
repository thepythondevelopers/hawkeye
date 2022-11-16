const express = require('express');

const cors = require('cors');
const app = express();
app.use(cors());
const mongoose = require('mongoose');
const User = require('./models/users');
const Following = require('./models/following');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { rmSync } = require('fs');
const jwtKey = "jwt";
var jsonParser = bodyParser.json();
mongoose.connect('mongodb+srv://raj:raj@cluster0.aeacp5p.mongodb.net/Instagram?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected");
})
app.get('/', async (req, res) => {
    res.send("Hello World");
})
app.post('/login', jsonParser, function (req, res) {
    User.findOne({ email: req.body.email }).then((data) => {
        console.log("data",data.password)
        if (data.password === req.body.password) {
            jwt.sign({ data }, jwtKey, { expiresIn: '30000s' }, async (err, token) => {
                await User.updateOne({email: req.body.email},{
                    $set:{
                        token : token
                    }
                })
                res.status(200).send({"msg":"Login Successfull","jwt":token});
            })
        }
        else{
            res.status(400).send({"msg":"EmailID and Password Does'nt Match"});
        }
    })
})
app.post('/register', jsonParser, function (req, res) {
    const data = new User({
        _id: mongoose.Types.ObjectId(),
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        token:"0"
    })
    data.save().then((result) => {
        console.log("result",result);
            res.status(201).send({"msg":"registration successfull"});
    }).catch((err) => console.log(err));
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