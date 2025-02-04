const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    img_url: { type: String, unique: true },
    name: { type: String },
    mobile: { type: String, unique: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    otp: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);
const UserModel = mongoose.model("users", DataSchema);
module.exports = UserModel;
