const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    // img_url: { type: String },
    name: { type: String },
    email: { type: String, unique: true, lowercase: true },
    mobile: { type: String, unique: true },
    password: { type: String },
    status: { type: String },
    role: { type: String },
    otp: { type: String },
  },
  { timestamps: true, versionKey: false }
);

DataSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const UserModel = mongoose.model("users", DataSchema);
module.exports = UserModel;
