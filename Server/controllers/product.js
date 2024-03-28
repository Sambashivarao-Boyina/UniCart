const Product=require("../models/product");

module.exports.getAllProducts=async (req,res)=>{
    const products=await Product.find();
    res.status(200).json({products});
}

module.exports.getSingleProduct=async (req,res)=>{
    const {productID}=req.params;
    const product=await Product.findById(productID);
    res.status(200).json({product});
}