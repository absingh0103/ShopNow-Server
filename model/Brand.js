const mongoose = require("mongoose");
const { Schema } = mongoose;

// Product Schema
const BrandSchema = new Schema({
    value: { type: String, required: true, unique: true },
    label: { type: String, required: true, unique: true },
});
// since we are using id in frontend Hence we also need to pass id from backend
// Mongodb provides a default id for each data hence we use that id
// to get that id as virtual id
const virtual = BrandSchema.virtual("id");
virtual.get(function () {
    return this._id;
});

// Now to set the ID
BrandSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (data, ret) {
        delete ret._id;
    },
});
//Now the id Automatically gets added to response of your data
// Not Visible in db

// Export Model
const Brands = new mongoose.model("Brands", BrandSchema);
module.exports = Brands;
