const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
    {
        subCategoryName: { type: String, unique: true, required: true },
        status: { type: String }
    },
    { timestamps: true, versionKey: false }
);
const SubCategoryModel = mongoose.model("subcategories", DataSchema);
module.exports = SubCategoryModel;
