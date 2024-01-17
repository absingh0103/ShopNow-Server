//* here user or (req.user) comes from the user created on signup
  //* if Not understand Check PassPortjs Login and signup Auth Code where user is created
  
// Import brand Schema
const Brands = require("../model/Brand");

// Api to fetch All Brands
exports.fetchBrands = async (req, resp) => {
  try {
    // to fetch All data
    const brands = await Brands.find({});
    resp.status(200).json(brands);
  } catch (err) {
    resp.status(400).json(err);
  }
};

// Add Brands APi
// TODO: this Api can be use in Future When we provide access to add new brands
exports.createBrand = async (req, resp) => {
  // it will get data from frontend and store in backend
  const brand = new Brands(req.body);
  try {
    const data = await brand.save();
    
    resp.status(200).json(data);
  } catch (err) {
    resp.status(400).json(err);
  }
};
