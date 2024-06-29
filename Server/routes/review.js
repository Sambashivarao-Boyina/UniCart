const express=require("express");
const router=express.Router();
const {verifyUser,isUser}=require("../middleware");
const wrapAsync = require("../util/wrapAsync");
const { addReview, getReviews, deleteReview, updateReview } = require("../controllers/review");


router
    .get("/:id",wrapAsync(getReviews))
    .post("/",verifyUser,isUser,wrapAsync(addReview))
    .put("/:id",verifyUser,isUser,wrapAsync(updateReview))
    .delete("/:id",verifyUser,isUser,wrapAsync(deleteReview));


module.exports=router;