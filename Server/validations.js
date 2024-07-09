const { orderSchema } = require("./Schemas/orderSchema");
const { productSchema } = require("./Schemas/productSchema");
const { reviewSchema, reviewUpdateSchema } = require("./Schemas/reviewSchema");
const { sellerSchema } = require("./Schemas/sellerSchema");
const { userSchema } = require("./Schemas/userSchema")
const ExpressError =require("./util/ExpressError");

module.exports.validateUser=(req,res,next)=>{
    let {error}=userSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.validateSeller=(req,res,next)=>{
    let {error}=sellerSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.validateProduct=(req,res,next)=>{
    let {error}=productSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.validateOrder= (req,res,next)=>{
    let {error}=orderSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.validateReview =  (req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}
module.exports.validateReviewUpdate =  (req,res,next)=>{
    let {error}=reviewUpdateSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}