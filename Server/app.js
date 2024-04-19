const express=require("express");
const app=express();
const dotenv=require("dotenv");
const mongoose = require('mongoose');
const ExpressError = require("./util/ExpressError");
const cors=require("cors");

if(process.env!=="production"){
    dotenv.config();
}



//Routes
const productRoute=require("./routes/product");
const auth=require("./routes/auth");

async function main() {
  await mongoose.connect(process.env.DB_Url);
}

main()
    .then(()=>{
        console.log("Connected to Database");
    })

//middlewares



app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json())


app.get("/",(req,res)=>{
    res.json({message:"Welcome EconNest"});
})

app.use("/product",productRoute);
app.use("/auth",auth);


app.get("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})

app.use((err,req,res,next)=>{
    let {status=500,message="some error"}=err;
    res.status(status).json({status,message});
})


app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on ${process.env.PORT}`);
})