const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    googleId:{
        type:String,
    },
    fullname:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    }

})

const User=mongoose.Model("User",userSchema);
module.exports=User;
