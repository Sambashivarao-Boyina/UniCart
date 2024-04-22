const express=require("express");
const wrapAsync = require("../util/wrapAsync");
const { userSignUp, accessRoute, userSignIn, refreshToken, userGoogleAuth, sellerSignUp, sellerSignIn, sellerGoogleAuth } = require("../controllers/auth");
const router=express.Router();

router.post("/user-signup",wrapAsync(userSignUp));
router.post("/user-signin",wrapAsync(userSignIn));
router.post("/user-google",wrapAsync(userGoogleAuth))

router.get("/refreshToken",wrapAsync(refreshToken));
router.get("/accessRoute",accessRoute);

router.post("/seller-signup",wrapAsync(sellerSignUp));
router.post("/seller-signin",wrapAsync(sellerSignIn));
router.post("/seller-google",wrapAsync(sellerGoogleAuth));



module.exports=router;