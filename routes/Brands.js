// Creating Routes
const express = require("express");
const { fetchBrands,createBrand } = require("../controller/Brand");
const router = new express.Router();

// Creating Route to put Product in db
// ("/brand is route is already coming from base route")
router.get("/", fetchBrands);
router.post("/", createBrand);
module.exports = router;
