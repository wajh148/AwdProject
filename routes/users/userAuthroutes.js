const express = require("express");
const router = new  express.Router();
const userAuthController = require("../../controllers/users/usercontroller");
const userUpload = require("../../multerconfig/userconfig/userconfig");
const userAuthenticate = require("../../middleware/userAuthenticate");

// user auth routes
router.post("/register",userUpload.single("userprofile"),userAuthController.register)
router.post("/login",userAuthController.login);
router.post("/forgetpassword",userAuthController.forgetpassword);
router.get("/forgetpassword/:id/:token",userAuthController.forgetpasswordVerify);
router.put("/resetpassword/:id/:token",userAuthController.resetPassword);
// user verify api
router.get("/userloggedin",userAuthenticate,userAuthController.userVarify);
module.exports = router; 
