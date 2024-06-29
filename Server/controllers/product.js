const Product=require("../models/product");
const Seller=require("../models/seller");
const multer=require("multer");
const upload=multer({dest:"../assets"});

module.exports.getAllProducts=async (req,res)=>{
    const products=await Product.find();
    res.status(200).json({products,isSuccess:true});
}

module.exports.getSingleProduct=async (req,res)=>{
    const {productID}=req.params;
    const product=await Product.findById(productID).populate("reviews");
    res.status(200).json({product,isSuccess:true});
}

module.exports.addNewProduct=async (req,res)=>{
    const {product}=req.body;
    const newProduct=new Product({...product,reviews:[]});
    const seller=await Seller.findById(req.user.id);
    newProduct.seller=req.user.id;

    try{
        const saved=await newProduct.save();
        seller.products.push(saved._id);
        await seller.save();
        console.log(saved);
    }catch(err){
        return res.status(500).json({error:"Cannot create the product",isSuccess:false});
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