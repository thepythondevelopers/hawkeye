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
    insta_profile_image:String,
    updated_profile_img:any=""
})
module.exports=mongoose.model('users',userSchema)