//* here user or (req.user) comes from the user created on signup
  //* if Not understand Check PassPortjs Login and signup Auth Code where user is created
const Cart = require("../model/Cart");
// Cart API's

// ADD to Cart APi
exports.addToCart = async (req, resp) => {
  const {id}=req.user;
  const cart = new Cart({...req.body,user:id});
  try {
    // Here Cart Store Reference Or Object_id of Product and User with quantity
    const data = await cart.save();
    const result = await data.populate("product");
    resp.status(200).json(result);
  } catch (err) {
    resp.status(400).json(err);
  }
};

// Fetch User Cart by user Id
exports.fetchCartItemsByUserId = async (req, resp) => {
  const { id } = req.user;
  try {
    const cartItems = await Cart.find({ user: id }).populate("product");
    resp.status(200).json(cartItems);
  } catch (err) {
    resp.status(400).json(err);
  }
};

// Delete From Cart
// resetCart Api in frontend also using deleteFromCart Internally  
exports.deleteFromCart = async (req, resp) => {
  // it is Product/Item id 
  const { id } = req.params;
  try {
    const deletedCartItems = await Cart.findByIdAndDelete(id);
    resp.status(200).json(deletedCartItems);
  } catch (err) {
    resp.status(400).json(err);
  }
};

// Update Cart ->>to update quantity
exports.updateCart = async (req, resp) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const updatedCart = await cart.populate("product");
    resp.status(200).json(updatedCart);
  } catch (err) {
    resp.status(400).json(err);
  }
};

