const mongoose=require("mongoose");
const Product=require("../models/product");
const dotenv=require("dotenv");
const path=require("path");

const envPath = path.resolve(__dirname, '..', '.env');

// Load the environment variables
const result = dotenv.config({ path: envPath });

async function main() {
    await mongoose.connect(process.env.DB_Url);
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
        rest={...rest,seller:"667e9930912c53cd6489c5a6"};
        return rest;
    })
    let count=0;
    for(let i=0;i<products.length;i++){
        try{
            const product=new Product({...products[i],reviews:[]});
            
            await product.save();
            count++;
        }catch(err){
            console.log(err);
        }
    }
    console.log(count);
    // await Product.insertMany(products);
}

initDatabase()
    .then(()=>{
        console.log("Database is initalized");
    });