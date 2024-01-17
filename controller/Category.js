//* here user or (req.user) comes from the user created on signup
  //* if Not understand Check PassPortjs Login and signup Auth Code where user is created

// Import brand Schema
const Category = require("../model/Category");

// Api to fetch All Brands
exports.fetchCategories = async (req, resp) => {
  try {
    // to fetch All data
    const categories = await Category.find({});
    resp.status(200).json(categories);
  } catch (err) {
    resp.status(400).json(err);
  }
};

// Add Category APi
// TODO: this Api can be use in Future When we provide access to add new Category
exports.createCategory = async (req, resp) => {
  // it will get data from frontend and store in backend
  const category = new Category(req.body);
  try {
    const data = await category.save();
    
    resp.status(200).json(data);
  } catch (err) {
    resp.status(400).json(err);
  }
};

//! exports.createCategory = async (req, resp) =>{} is same as
//! const createCategory = async (req, resp) =>{} and then export as
//! exports.module={createCategory,...Others}
