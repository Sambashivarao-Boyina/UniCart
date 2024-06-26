const Order = require("../models/order");
const Product=require("../models/product");
const Seller = require("../models/seller");
const User=require("../models/user");



module.exports.placeOrder=async (req,res)=>{
    const {orderDetails}=req.body;

    const user=await User.findById(req.user.id).populate("cart");
    if(user.cart.length===0){
        return res.status(404).json({isSuccess:false,message:"your cart is empty"});
    }
    
    for(let i=0;i<orderDetails.cart.length;i++){
        const product=await Product.findById(orderDetails.cart[i].product);
        
        const order=new Order();
        order.buyyer=req.user.id;
        order.seller=product.seller;
        order.product=orderDetails.cart[i].product;
        order.noOfItems=orderDetails.cart[i].count;
        order.address=orderDetails.address;

        const productSeller=await Seller.findById(product.seller);

        const newOrder=await order.save();
        user.orders.push(newOrder._id);
        productSeller.orders.push(newOrder.id);
        await productSeller.save();

    }
    user.cart=[];
    let saveUser=await user.save();
    
    console.log(saveUser);
    res.status(200).json({isSuccess:true,message:"OrderPlaced",cart:saveUser.cart});
}