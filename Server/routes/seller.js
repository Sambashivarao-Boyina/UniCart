const express=require("express");
const { verifyUser, isSeller } = require("../middleware");
const { getOrders } = require("../controllers/seller");
const wrapAsync = require("../util/wrapAsync");
const router=express.Router();


router.get("/orders",verifyUser,isSeller,wrapAsync(getOrders));

module.exports=router;


