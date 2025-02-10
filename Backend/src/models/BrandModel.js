const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    brandName: { type: String, required: true },
    brandImg: { type: String },
    status: { type: String }
  },
  { timestamps: true, versionKey: false }
);
const BrandModel = mongoose.model("brands", DataSchema);
module.exports = BrandModel;
