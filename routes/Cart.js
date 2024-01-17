// Creating Routes
const express = require("express");
const { fetchCartItemsByUserId, addToCart, deleteFromCart, updateCart } = require("../controller/Cart")

const router = new express.Router();

// Creating Route to put Product in db
// ("/products is route is already coming from base route")
// Final router will we like /products/id etc...
router.post("/", addToCart);
router.get("/",fetchCartItemsByUserId)
router.delete("/:id",deleteFromCart)
router.patch("/:id",updateCart)

module.exports = router;