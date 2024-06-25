const mongoose= require("mongoose");
const Schema=mongoose.Schema;

const addressSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone1:{
        type:String,
        required:true,
    },
    phone2:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    street:{
        type:String,
        required:true,
    },
    houseNo:{
        type:String,
        required:true,
    },
    pinCode:{
        type:String,
        required:true,
    },
    landMark:{
        type:String,
        required:true,
    },
})

const orderSchema=new Schema({
    buyyer:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    seller:{
        type:Schema.Types.ObjectId,
        ref:"Seller"
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product",
    },
    noOfItems:{
        type:Number,
        required:true,
    },
    address:addressSchema,
    orderStatus:{
        type:String,
        enum:["OrderPlaced","Packed","Deliverd"],
        default:"OrderPlaced"
    },
    orderedDate:{
        type:Date,
        default:Date.now()
    }
})

const Order=mongoose.model("Order",orderSchema);

module.exports=Order;