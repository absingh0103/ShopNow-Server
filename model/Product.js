const mongoose = require("mongoose");
const { Schema } = mongoose;

// Product Schema
const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
  price: {
    type: Number,
    min: [0, "Price must be >= 0"],
    max: [1000000, "Price must be <= 1000000"],
  },
  discountPercentage: {
    type: Number,
    min: [1, "wrong min discount"],
    max: [99, "wrong max discount"],
  },
  rating: {
    type: Number,
    min: [0, "wrong min rating"],
    max: [5, "wrong max rating"],
    default: 0,
  },
  highlights: { type: [String], required: true },
  stock: { type: Number, min: [0, "wrong Min stock"], default: 0 },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  discountPrice:{type:Number},
  colors: { type: Schema.Types.Mixed },
  sizes: { type: Schema.Types.Mixed },
  deleted: { type: Boolean, default: false },
});

// since we are using id in frontend Hence we also need to pass id from backend
// Mongodb provides a default id for each data hence we use that id
// to get that id as virtual id
const virtual = ProductSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

// Now to set the ID
ProductSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (data, ret) {
    delete ret._id;
  },
});
//Now the id Automatically gets added to response of your data
// Not Visible in db

// Export Model
const Product = new mongoose.model("Products", ProductSchema);
module.exports = Product;
