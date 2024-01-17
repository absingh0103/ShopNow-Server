// Creating Routes
const express = require("express");
const {
  createProducts,
  fetchProductsByFilters,
  fetchProductsById,
  updateProduct,
  fetchSearchedProducts,
} = require("../controller/Product");

const router = new express.Router();

// Creating Route to put Product in db
// ("/products is route is already coming from base route")
// Final router will we like /products/id etc...
router.post("/", createProducts);
router.get("/", fetchProductsByFilters);
router.get("/:id", fetchProductsById);
router.get("/search/:input", fetchSearchedProducts);
router.patch("/:id", updateProduct);

module.exports = router;
