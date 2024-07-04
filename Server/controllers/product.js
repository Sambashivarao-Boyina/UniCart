const Product=require("../models/product");
const Seller=require("../models/seller");
const multer=require("multer");
const upload=multer({dest:"../assets"});
const ExpressError=require("../util/ExpressError");

module.exports.getAllProducts=async (req,res)=>{
    const products=await Product.find().populate("reviews");
    res.status(200).json({products,isSuccess:true});
}

module.exports.getSingleProduct=async (req,res)=>{
    const {productID}=req.params;
    const product=await Product.findById(productID).populate("reviews");
    res.status(200).json({product,isSuccess:true});
}

module.exports.addNewProduct=async (req,res,next)=>{
    const {product}=req.body;
    const newProduct=new Product({...product,reviews:[]});
    const seller=await Seller.findById(req.user.id);
    newProduct.seller=req.user.id;

    try{
        const saved=await newProduct.save();
        seller.products.push(saved._id);
        await seller.save();
    }catch(err){
        next(new ExpressError(404,err.message));
    }
    res.status(200).json({message:"New Product is Created Successfully",isSuccess:true});
}


module.exports.deleteProduct = async (req,res)=>{
    const {productId}=req.params;
    const id=req.user.id;
    const product= await Product.findById(productId);
    const seller= await Seller.findById(id);


    if(product.seller!==id){
        res.status(404).json({message:"You are not the Owner of this Product",isSuccess:false});
    }else{
        seller.products=seller.products.filter((pID)=>pID!=productId);
        await seller.save();
        await Product.findByIdAndDelete(productId);
        
        res.status(200).json({message:"Product Deleted Successfully",isSuccess:true});
    }

}


module.exports.updateProduct= async (req,res)=>{

    const {productID}=req.params;
    const {product}=req.body;

    const seller=await Seller.findById(req.user.id);
    if(seller==null){
        throw new ExpressError(404,"User not Found");
    }

    const findproduct=await Product.findById(productID);
    if(findproduct==null){
        throw new ExpressError(404,"Product Not Found");
    }

    if(!findproduct.seller.equals(req.user.id)){
        throw new ExpressError(401,"You are not Seller of this product ");
    }
    
    
    await Product.findByIdAndUpdate(productID,product);
    const updated=await Product.findById(productID);
    
    res.status(200).json({isSuccess:true,message:"product is updated",product:updated});
}