const express=require("express");
const router=express.Router();
const wrapAsync=require("../util/wrapAsync");
const productController=require("../controllers/product");
const { verifyUser, isSeller } = require("../middleware");


router.get("/allProducts",wrapAsync(productController.getAllProducts));

router.get("/:productID",wrapAsync(productController.getSingleProduct));

router.post("/newproduct",verifyUser,isSeller,wrapAsync(productController.addNewProduct));

router.delete("/deleteProduct/:productId",verifyUser,isSeller,wrapAsync(productController.deleteProduct));

module.exports=router;