// Creating Routes
const express = require("express");
const  Passport  = require("passport");
const { createUser, loginUser, CheckUser, logout, resetPasswordRequest, resetPassword } = require("../controller/Auth")

const router = new express.Router();

// Creating Route to put Product in db
// ("/products is route is already coming from base route")
// Final router will we like /products/id etc...
router.post("/signup", createUser);
// Here Passport Authentication Middleawre is Applied
router.post("/login",Passport.authenticate("local"),loginUser);
router.get("/check", Passport.authenticate("jwt"),CheckUser)
router.get('/logout', logout)
router.post("/reset-password-request", resetPasswordRequest);
router.post("/reset-password", resetPassword);
module.exports = router;