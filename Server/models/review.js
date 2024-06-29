const mongoose =require("mongoose");
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
    rating:{
        type:Number,
        required:true,
    },
    comment:{
        type:String,
        requried:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product",
    }
})

const Review=mongoose.model("Review",reviewSchema);

module.exports=Review;