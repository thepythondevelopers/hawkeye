const mongoose = require('mongoose');

let otpSchema =  new mongoose.Schema({
    email:String,
    otp:String
})
module.exports=mongoose.model('otps',otpSchema)