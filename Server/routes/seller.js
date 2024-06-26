const express=require("express");
const { verifyUser, isSeller } = require("../middleware");
const { getOrders, updateOrder } = require("../controllers/seller");
const wrapAsync = require("../util/wrapAsync");
const router=express.Router();


router.get("/orders",verifyUser,isSeller,wrapAsync(getOrders));
router.put("/order/:id",verifyUser,isSeller,wrapAsync(updateOrder));


module.exports=router;


