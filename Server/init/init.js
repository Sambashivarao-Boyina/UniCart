const mongoose=require("mongoose");
const Product=require("../models/product");
const dotenv=require("dotenv");
const path=require("path");
const Seller=require("../models/seller");

const envPath = path.resolve(__dirname, '..', '.env');

// Load the environment variables
const result = dotenv.config({ path: envPath });

async function main() {
    await mongoose.connect(process.env.DATABASE_URL);
}
  
main()
    .then(()=>{
        console.log("Connected to Database");
    })
  

async function fetchProducts(){
    const response=await fetch('https://dummyjson.com/products?limit=0');
    const data=await response.json();
    return data.products;
}

async function initDatabase(){
    await Product.deleteMany({});
    let products=await fetchProducts();
    products=products.map(product=>{
        let {id,dimensions,shippingInformation,availabilityStatus,reviews,minimumOrderQuantity,meta,...rest}=product;
        rest={...rest,seller:"668ed3a388c924f5c49c5869"};
        return rest;
    })
    let count=0;
    const seller=await Seller.findById("668ed3a388c924f5c49c5869");
    for(let i=products.length-1;i>=0;i--){
        try{
            const product=new Product({...products[i],reviews:[]});
            const savedProduct =await product.save();
            seller.products.push(savedProduct._id);
            count++;
        }catch(err){
            console.log(err);
        }
    }
    await seller.save();
    console.log(count);
    // await Product.insertMany(products);
}

initDatabase()
    .then(()=>{
        console.log("Database is initalized");
    });