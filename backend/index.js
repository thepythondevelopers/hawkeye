const express = require('express');

const cors = require('cors');
const app = express();
app.use(cors());
const mongoose = require('mongoose');
const User = require('./models/users');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var key = "password";
var algo = "aes256";
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
        console.log("data",data)
        var decipher = crypto.createDecipher(algo, key);
        var decrypted = decipher.update(data.password, 'hex', 'utf8') + decipher.final('utf8');
        if (decrypted === req.body.password) {
            jwt.sign({ data }, jwtKey, { expiresIn: '300s' }, async (err, token) => {
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
        console.log(decrypted);
    })
})
app.post('/register', jsonParser, function (req, res) {
    var cipher = crypto.createCipher(algo, key);
    var encrypted = cipher.update(req.body.password, 'utf8', 'hex')
        + cipher.final('hex');
    console.log(encrypted);
    const data = new User({
        _id: mongoose.Types.ObjectId(),
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: encrypted,
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