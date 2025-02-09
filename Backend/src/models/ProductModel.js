const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    title: { type: String },
    shortDes: { type: String },
    price: { type: String },
    discount: { type: Boolean },
    discountPrice: { type: String },
    image: { type: String },
    stock: { type: Boolean },
    badge: { type: Boolean },
    status: { type: Boolean },

    brandID: { type: mongoose.Schema.Types.ObjectId, required: true },
    categoryID: { type: mongoose.Schema.Types.ObjectId, required: true },
    subCategoryID: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);
const ProductModel = mongoose.model("products", DataSchema);
module.exports = ProductModel;
