const express=require("express");
const wrapAsync = require("../util/wrapAsync");
const { placeOrder } = require("../controllers/order");
const { verifyUser, isUser } = require("../middleware");
const router=express.Router();


router.post("/",verifyUser,isUser,wrapAsync(placeOrder));


module.exports=router;
