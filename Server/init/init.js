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
        let {id,...rest}=product;
        rest={...rest,seller:"662a2df549c4b06b652f7102"};
        return rest;
    })
    await Product.insertMany(products);
}

initDatabase()
    .then(()=>{
        console.log("Database is initalized");
    });