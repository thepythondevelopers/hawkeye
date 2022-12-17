const mongoose = require('mongoose');

let userSchema =  new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    password:String,
    location:String,
    occupation:String,
    website:String,
    about_me:String,
    token:String,
    plan:String,
    updated_profile_img:{data:Buffer,contentType: String}
})
module.exports=mongoose.model('users',userSchema)