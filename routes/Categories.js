// Creating Routes
const express = require("express");
const { fetchCategories ,createCategory} = require("../controller/Category");


const router = new express.Router();

// Creating Route to put Product in db
// ("/categories is route is already coming from base route")

router.get('/', fetchCategories)
router.post("/", createCategory)
module.exports = router;