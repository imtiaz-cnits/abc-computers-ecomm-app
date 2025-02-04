const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    img_url: { type: String, unique: true },
    name: { type: String },
    email: { type: String, unique: true, required: true, lowercase: true },
    mobile: { type: String, unique: true },
    password: { type: String, unique: true },
    status: { type: String, unique: true },
    role: { type: String, unique: true },
    otp: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("users", DataSchema);
module.exports = UserModel;
