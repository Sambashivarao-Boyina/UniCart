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
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
    type:{
        type:String,
        default:"Seller",
    },
    orders:[
        {
            type:Schema.Types.ObjectId,
            ref:"Order"
        }
    ]
},{
    timestamps:true
})

const Seller=mongoose.model("Seller",sellerSchema);
module.exports=Seller;