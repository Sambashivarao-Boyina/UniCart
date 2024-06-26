const Seller = require("../models/seller");
const Product = require("../models/product");
const Order=require("../models/order");

module.exports.getOrders=async (req,res)=>{
    const seller=await Seller.findById(req.user.id).populate("orders").populate({
        path:"orders",
        populate:"product"
    })

    res.json({isSuccess:true,seller});
}

module.exports.updateOrder=async (req,res)=>{
    const {id}=req.params;
    const {newStatus}=req.body;
    const order=await Order.findById(id);
    order.orderStatus=newStatus;
    await order.save();

    const seller=await Seller.findById(req.user.id).populate("orders").populate({
        path:"orders",
        populate:"product"
    })

    res.status(200).json({isSuccess:true,seller});
}

