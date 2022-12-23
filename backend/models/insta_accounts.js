const mongoose = require('mongoose');

let insta_accountsSchema =  new mongoose.Schema({
    email:String,
    account_1:String,
    ig_id_1:String,
    access_token_1:String,
    account_2:String,
    ig_id_2:String,
    access_token_2:String,
    account_3:String,
    ig_id_3:String,
    access_token_3:String,
    account_4:String,
    ig_id_4:String,
    access_token_4:String,
    ig_id_5:String,
    account_5:String,
    access_token_5:String
})
module.exports=mongoose.model('insta_accounts',insta_accountsSchema)