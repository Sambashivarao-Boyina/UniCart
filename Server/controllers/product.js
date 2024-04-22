const Product=require("../models/product");

module.exports.getAllProducts=async (req,res)=>{
    const products=await Product.find();
    res.status(200).json({products});
}

module.exports.getSingleProduct=async (req,res)=>{
    const {productID}=req.params;
    const product=await Product.findById(productID);
    return res.status(200).json({product});
}

module.exports.addNewProduct=async (req,res)=>{
    const {product}=req.body;
    
    const newProduct=new Product(product);
    try{
        await newProduct.save();
    }catch(err){
        return res.status(500).json({error:"Cannot create the product",isSuccess:false});
    }
    return res.status(200).json({message:"New Product is Created Successfully",isSuccess:true});
}