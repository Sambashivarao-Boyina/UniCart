const express=require("express");
const router=express.Router();
const wrapAsync=require("../util/wrapAsync");
const { addToCart, removeFromCart } = require("../controllers/user");
const {verifyUser, isUser}=require("../middleware");

router.put("/addToCart",verifyUser,isUser,wrapAsync(addToCart));
router.put("/removeFromCart/:productId",verifyUser,isUser,wrapAsync(removeFromCart));


module.exports=router;
