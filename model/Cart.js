const mongoose = require("mongoose");
const { Schema } = mongoose;

// Cart Schema
// Here we are using reference and Populate method to define schema
// here we only pass id of product and automatically populate the product details
// Take Reference from mongoose site
const CartSchema = new Schema({
  quantity: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Products", required: true },
  user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  color: { type: Schema.Types.Mixed},
  size: {type: Schema.Types.Mixed},
}, { timestamps: true });

// since we are using id in frontend Hence we also need to pass id from backend
// Mongodb provides a default id for each data hence we use that id
// to get that id as virtual id
const virtual = CartSchema.virtual("id");
virtual.get(function () {
  return this._id;
}); 

// Now to set the ID
CartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (data, ret) {
    delete ret._id;
  },
});
//Now the id Automatically gets added to response of your data
// Not Visible in db

// Export Model
const Cart = new mongoose.model("Carts", CartSchema);
module.exports = Cart;
