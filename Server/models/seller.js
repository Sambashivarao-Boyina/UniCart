const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const sellerSchema=new Schema({
    sellerName:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        default:"Seller",
    }
})

const Seller=mongoose.model("Seller",sellerSchema);
module.exports=Seller;