    const User=require("../models/user");
const Product=require("../models/product");
const ExpressError=require("../util/ExpressError")
const Order=require("../models/order");

module.exports.addToCart=async (req,res)=>{
    const {item}=req.body;
    item.count=parseInt(item.count);
    if(item.count<=0){
        item.count=1;
    }

    const user=await User.findById(req.user.id);
    if(!user){
        return res.status(404).json({message:"User not found",isSuccess:false});
    }

    const product=await Product.findById(item.product);
    if(!product){
        return res.status(404).json({message:"Product doesn't exist",isSuccess:false});
    }
    
    let idx=user.cart.findIndex(cartItem => cartItem.product.equals(product._id));
    if(idx===-1){
        user.cart.push({product:item.product,count:item.count});
    }else{
        user.cart[idx].count+=item.count;
    }

    const updatedUser=await user.save();
    res.status(202).json({message:"Added To cart",cart:updatedUser.cart,isSuccess:true});

}

module.exports.removeFromCart=async (req,res)=>{
    const {productId}=req.params;
   
    const user=await User.findById(req.user.id);
    if(!user){
        return res.status(404).json({message:"User not found",isSuccess:false});
    }
    const product=await Product.findById(productId);
    if(!product){
        return res.status(404).json({message:"Product doesn't exist",isSuccess:false});
    }
    
    user.cart=user.cart.filter(cartItem => !cartItem.product.equals(product._id));
    
    const updatedUser=await user.save();
    res.status(202).json({message:"Removed From cart",cart:updatedUser.cart,isSuccess:true});

}

module.exports.getCart = async (req,res,next)=>{
    const userID=req.user.id;
    let user;
    try{
        user=await User.findById(userID).populate({path:"cart.product",select:"title _id brand category price discountPercentage thumbnail actualPrice stock"});
    }catch(error){
        next(new ExpressError(404,"user not found"));
    }
    
    const {cart,...remainging}=user;

    res.status(202).json({message:"Success",cart,isSuccess:true});   

}

module.exports.changeCartCount =async (req,res,next)=>{
    const {productId}=req.params; 
    let user;
    try{
        user=await User.findById(req.user.id);
    }catch(error){
        next(new ExpressError(404,"User Not found"));
    }

    if(req.body.count<0){
        req.body.count=1;
    }

    let idx=user.cart.findIndex((item)=>item.product.equals(productId));
    req.body.count=req.body.count===0 || req.body.count== null ? 1 : req.body.count
    user.cart[idx].count=req.body.count;

    const updateUser=await user.save();

    res.status(202).json({message:"Count Changed",cart:updateUser.cart,isSuccess:true});
}




module.exports.getOrders=async (req,res)=>{
    const user=await User.findById(req.user.id).populate("orders").populate({
        path:"orders",
        populate:"product"
    })

    res.status(200).json({isSuccess:true,user});
}


module.exports.cancelOrder=async (req,res)=>{
    const {id}=req.params;
    const order=await Order.findById(id);
    order.orderStatus="Canceled";
    await order.save();

    const user=await User.findById(req.user.id).populate("orders").populate({
        path:"orders",
        populate:"product"
    })

    res.status(200).json({isSuccess:true,user});
}


module.exports.addToWishList = async (req,res,next)=>{
    const {id}=req.params;
    const product=await Product.findById(id);
    if(product==null){
        next(new ExpressError(400,"product not found"));
    }

    let user=await User.findById(req.user.id);

    if(user===null){
        next(new ExpressError(400,"user not found"));
    }
    if(user.wishlist!==null){
        user.wishlist.push(id);
        user=await user.save();

    }else{
         user = await User.findByIdUpdate(req.user.id,{wishlist:[id]});
    }
    res.status(200).json({isSuccess:true,message:"Added to wishlist",user});

    
}

module.exports.removeFromWishList = async (req,res,next)=>{
    const {id}=req.params;
    
    const product=await Product.findById(id);
    if(product==null){
        next(new ExpressError(400,"product not found"));
    }

    let user=await User.findById(req.user.id);

    if(user===null){
        next(new ExpressError(400,"user not found"));
    }
    if(user.wishlist && user.wishlist.length>0){
        user.wishlist=user.wishlist.filter((item)=>!item.equals(id));
        await user.save();
        user=await User.findById(req.user.id);
    }
    res.status(200).json({isSuccess:true,message:"Removed to wishlist",user});
}

module.exports.getWishlist=async (req,res)=>{
    const user=await User.findById(req.user.id).populate("wishlist");
    res.status(200).json({isSuccess:true,wishlist:user.wishlist});
}