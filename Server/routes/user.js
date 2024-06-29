const express=require("express");
const router=express.Router();
const wrapAsync=require("../util/wrapAsync");
const { addToCart, removeFromCart, getCart, changeCartCount, getOrders, cancelOrder } = require("../controllers/user");
const {verifyUser, isUser}=require("../middleware");

router.get("/cart",verifyUser,isUser,wrapAsync(getCart));
router.put("/addToCart",verifyUser,isUser,wrapAsync(addToCart));
router.put("/removeFromCart/:productId",verifyUser,isUser,wrapAsync(removeFromCart));
router.put("/changeCount/:productId",verifyUser,isUser,wrapAsync(changeCartCount));

router.get("/orders",verifyUser,isUser,wrapAsync(getOrders));
router.delete("/orders/:id",verifyUser,isUser,wrapAsync(cancelOrder));

module.exports=router;
