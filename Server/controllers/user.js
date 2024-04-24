const User=require("../models/user");
const Product=require("../models/product");

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
    return res.status(202).json({message:"Added To cart",cart:updatedUser.cart,isSuccess:true});

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
    return res.status(202).json({message:"Removed From cart",cart:updatedUser.cart,isSuccess:true});

}