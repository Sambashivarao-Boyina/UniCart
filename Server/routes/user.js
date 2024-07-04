const express=require("express");
const router=express.Router();
const wrapAsync=require("../util/wrapAsync");
const { addToCart, removeFromCart, getCart, changeCartCount, getOrders, cancelOrder, addToWishList, removeFromWishList, getWishlist } = require("../controllers/user");
const {verifyUser, isUser}=require("../middleware");
const { verify } = require("jsonwebtoken");

router.get("/cart",verifyUser,isUser,wrapAsync(getCart));
router.put("/addToCart",verifyUser,isUser,wrapAsync(addToCart));
router.put("/removeFromCart/:productId",verifyUser,isUser,wrapAsync(removeFromCart));
router.put("/changeCount/:productId",verifyUser,isUser,wrapAsync(changeCartCount));

router.get("/orders",verifyUser,isUser,wrapAsync(getOrders));
router.delete("/orders/:id",verifyUser,isUser,wrapAsync(cancelOrder));

router.put("/like/:id",verifyUser,isUser,wrapAsync(addToWishList));
router.put("/unlike/:id",verifyUser,isUser,wrapAsync(removeFromWishList));

router.get("/wishlist",verifyUser,isUser,wrapAsync(getWishlist));

module.exports=router;
