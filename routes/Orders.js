// Creating Routes
const express = require("express");
const {
  createOrder,
  fetchUserOrders,
  cancleOrder,
  updateOrder,
  fetchAllOrders,
} = require("../controller/Orders");

const router = new express.Router();

// Creating Route to put Product in db
// ("/products is route is already coming from base route")
// Final router will we like /products/id etc...
router.post("/",createOrder);
router.get("/user/own", fetchUserOrders);
router.delete("/:id", cancleOrder);
router.patch("/:id", updateOrder);
router.get("/", fetchAllOrders);

module.exports = router;
