const mongoose = require("mongoose");
const { Schema } = mongoose;

// Product Schema
const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: Buffer, required: true },
    addresses: { type: [Schema.Types.Mixed] },
    role: { type: String, default: "user", required: true },
    name: { type: String , required: true},
    orders: { type: [Schema.Types.Mixed] },
    salt: { type: Buffer },
    resetPasswordToken: { type: String, default: "" },
  },
  { timestamps: true }
);

// since we are using id in frontend Hence we also need to pass id from backend
// Mongodb provides a default id for each data hence we use that id
// to get that id as virtual id
const virtual = UserSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

// Now to set the ID
UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (data, ret) {
    delete ret._id;
  },
});
//Now the id Automatically gets added to response of your data
// Not Visible in db

// Export Model
const Users = new mongoose.model("Users", UserSchema);
module.exports = Users;
