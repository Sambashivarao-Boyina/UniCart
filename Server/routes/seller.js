const express=require("express");
const { verifyUser, isSeller } = require("../middleware");
const { getOrders, updateOrder, deleteCanceledOrders, getMyProducts, getSeller } = require("../controllers/seller");
const wrapAsync = require("../util/wrapAsync");
const router=express.Router();


// router.get("/",verifyUser,isSeller,wrapAsync(getSeller));
router.get("/myproducts",verifyUser,isSeller,wrapAsync(getMyProducts));
router.get("/orders",verifyUser,isSeller,wrapAsync(getOrders));
router.put("/order/:id",verifyUser,isSeller,wrapAsync(updateOrder));
router.delete("/orders",verifyUser,isSeller,wrapAsync(deleteCanceledOrders));

module.exports=router;


