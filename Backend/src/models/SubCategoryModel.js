const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    subCategoryName: { type: String, unique: true },
    subCategoryImg: { type: String, unique: true },
    status: { type: String, unique: true }
  },
  { timestamps: true, versionKey: false }
);
const SubCategoryModel = mongoose.model("subcategories", DataSchema);
module.exports = SubCategoryModel;
