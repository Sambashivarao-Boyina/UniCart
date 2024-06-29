const Product = require("../models/product");
const Review=require("../models/review");
const ExpressError = require("../util/ExpressError");


module.exports.addReview= async (req,res)=>{

    const {rating,comment,productID}=req.body;
    const review=new Review({rating,comment});
    review.user=req.user.id;
    review.product=productID;
    const saved=await review.save();
    const product=await Product.findById(productID);
    if(product.reviews){
        product.reviews.push(review._id);
    }else{
        product.add({reviews:[]});
        product.reviews.add(review._id);
    }
    await product.save();    

    const productAfter=await Product.findById(productID).populate("reviews").populate({path:"reviews",populate:"user"});

    
    res.status(200).json({isSuccess:true,message:"Review saved Successfully",reviews:productAfter.reviews});
}


module.exports.getReviews= async (req,res)=>{
    const {id}=req.params;
    const product=await Product.findById(id).populate("reviews").populate({path:"reviews",populate:"user"});
    res.status(200).json({isSuccess:true,reviews:product.reviews});
}

module.exports.deleteReview = async (req,res,next)=>{

    const {id}=req.params;
    const review=await Review.findById(id);
    
    if(!review.user.equals(req.user.id)){
        next(new ExpressError(404,"You are not owner of review"))
    }else{
        let product=await Product.findById(review.product);
        product.reviews=product.reviews.filter((rid)=>rid!==id);

        await product.save();
        await Review.findByIdAndDelete(id);

        product=await Product.findById(review.product).populate("reviews").populate({path:"reviews",populate:"user"});
        res.status(200).json({isSuccess:true,reviews:product.reviews});

    }

}

module.exports.updateReview = async (req,res,next)=>{

    const {id}=req.params;
    const {rating,comment}=req.body;
    const review=await Review.findById(id);
    
    if(!review.user.equals(req.user.id)){
        next(new ExpressError(404,"You are not owner of review"))
    }else{
        await Review.findByIdAndUpdate(id,{rating,comment});
        let product=await Product.findById(review.product).populate("reviews").populate({path:"reviews",populate:"user"});
        res.status(200).json({isSuccess:true,reviews:product.reviews});
    }

}