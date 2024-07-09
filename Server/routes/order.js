const express=require("express");
const wrapAsync = require("../util/wrapAsync");
const { placeOrder } = require("../controllers/order");
const { verifyUser, isUser } = require("../middleware");
const { validateOrder } = require("../validations");
const router=express.Router();


router.post("/",verifyUser,isUser,validateOrder,wrapAsync(placeOrder));


module.exports=router;
