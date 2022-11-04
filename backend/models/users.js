const mongoose = require('mongoose');

let userSchema =  new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    fname:String,
    lname:String,
    email:String,
    password:String,
    token:String
})
module.exports=mongoose.model('users',userSchema)