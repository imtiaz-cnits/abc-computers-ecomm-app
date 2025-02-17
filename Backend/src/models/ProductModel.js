const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    productCode: { type: String },
    productName: { type: String },
    status: { type: String },
    price: { type: String },
    discount: { type: Boolean },
    discountPrice: { type: String },
    keyFeature: { type: String },
    specification: { type: String },
    description: { type: String },
    image: { type: String },
    stock: { type: String },
    color: { type: String },
    badge: { type: String },

    brandID: { type: mongoose.Schema.Types.ObjectId, required: true },
    categoryID: { type: mongoose.Schema.Types.ObjectId, required: true },
    subCategoryID: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);
const ProductModel = mongoose.model("products", DataSchema);
module.exports = ProductModel;
