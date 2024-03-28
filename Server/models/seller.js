const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const sellerSchema=new Schema({
    SellerName:{
        type:String,
        required:true,
        unique:true,
    },
    PhoneNumber:{
        type:String,
        required:true,
    }
})