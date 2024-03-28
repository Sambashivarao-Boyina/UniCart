const express=require("express");
const router=express.Router();
const wrapAsync=require("../util/wrapAsync");
const productController=require("../controllers/product");

router.get("/allProducts",wrapAsync(productController.getAllProducts));

router.get("/:productID",wrapAsync(productController.getSingleProduct));

module.exports=router;