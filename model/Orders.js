const mongoose = require("mongoose");
const { Schema } = mongoose;

// Cart Schema
// Here we are using reference and Populate method to define schema
// here we only pass id of product and automatically populate the product details
// Take Reference from mongoose site

// For Enum Validation 
const paymentMethods = {
  values: ['card', 'cash'],
    message: 'enum validator failed for payment methods`'
}
const OrderSchema = new Schema(
  {
    cartItems: { type: [Schema.Types.Mixed], required: true },
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    selectedAddress: { type: Schema.Types.Mixed, required: true },
    paymentMethod: { type: String, required: true ,enum:paymentMethods},
    totalAmount: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  // it will Create a timestamp when it is created and Last time Updated
  { timestamps: true }
);

// since we are using id in frontend Hence we also need to pass id from backend
// Mongodb provides a default id for each data hence we use that id
// to get that id as virtual id
const virtual = OrderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

// Now to set the ID
OrderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (data, ret) {
    delete ret._id;
  },
});
//Now the id Automatically gets added to response of your data
// Not Visible in db

// Export Model
const Order = new mongoose.model("Order", OrderSchema);
module.exports = Order;
