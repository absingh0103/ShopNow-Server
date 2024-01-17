//* here user or (req.user) comes from the user created on signup
//* if Not understand Check PassPortjs Login and signup Auth Code where user is created
const Users = require("../model/Users");

// fetch LoggedIn User By User Id
exports.fetchLoggedInUser = async (req, resp) => {
  const { id } = req.user;

  try {
    // here it will return only specified data {name eamil addresses orders} password is excluded
    const user = await Users.findById(id);
 
    resp.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      orders: user.orders,
      addresses: user.addresses,
    });
  } catch (err) {
    resp.status(400).json(err);
  }
};

// Update User Api
exports.updateUser = async (req, resp) => {
  try {
    const { id } = req.params;
    const updatedUser = await Users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    resp.status(201).json(updatedUser);
  } catch (err) {
    resp.status(400).json(err);
  }
};
