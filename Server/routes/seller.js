const express=require("express");
const { verifyUser, isSeller } = require("../middleware");
const { getOrders, updateOrder, deleteCanceledOrders } = require("../controllers/seller");
const wrapAsync = require("../util/wrapAsync");
const router=express.Router();


router.get("/orders",verifyUser,isSeller,wrapAsync(getOrders));
router.put("/order/:id",verifyUser,isSeller,wrapAsync(updateOrder));
router.delete("/orders",verifyUser,isSeller,wrapAsync(deleteCanceledOrders));

module.exports=router;


