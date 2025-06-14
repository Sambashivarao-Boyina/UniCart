const express=require("express");
const app=express();
const dotenv=require("dotenv");
const mongoose = require('mongoose');
const ExpressError = require("./util/ExpressError");
const cors=require("cors");
const path=require("path");


if(process.env.NODE_ENV !=="production"){
    dotenv.config();
}
                            
app.use(express.static(path.join(__dirname,"/dist")));


//Routes
const productRoute=require("./routes/product");
const auth=require("./routes/auth");
const user=require("./routes/user");
const order=require("./routes/order");
const seller=require("./routes/seller");
const review=require("./routes/review");

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
}

main()
    .then(()=>{
        console.log("Connected to Database");
    })

//middlewares





app.use(express.json())



app.get("/",(req,res)=>{
    res.json({message:"Welcome EconNest"});
})

app.use("/api/product",productRoute);
app.use("/api/auth",auth);
app.use("/api/user",user);
app.use("/api/order",order);
app.use("/api/seller",seller);
app.use("/api/review",review);


//client rendering
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"/dist/index.html"));
})



// app.get("/*",(req,res,next)=>{
//     next(new ExpressError(404,"page not found"));
// })

app.use((err,req,res,next)=>{
    if (res.headersSent) {
        return next(err);
    }

    let {status=500,message="some error"}=err;
    res.status(status).json({message,isSuccess:false});
})


app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on ${process.env.PORT}`);
})