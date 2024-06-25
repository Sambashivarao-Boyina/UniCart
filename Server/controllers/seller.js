const Seller = require("../models/seller")

module.exports.getOrders=async (req,res)=>{
    const seller=await Seller.findById(req.user.id).populate("orders");

    res.json({isSuccess:true,seller});
}