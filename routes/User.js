// Creating Routes
const express = require("express");
const { fetchLoggedInUser, updateUser } =require("../controller/Users")

const router = new express.Router();

// Creating Route to put Product in db
// ("/products is route is already coming from base route")
// Final router will we like /products/id etc...
router.patch("/:id", updateUser);
router.get("/own", fetchLoggedInUser)

module.exports = router;