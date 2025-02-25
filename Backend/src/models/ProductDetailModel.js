const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    img1: { type: String },
    img2: { type: String },
    img3: { type: String },
    img4: { type: String },
    img5: { type: String },
    img6: { type: String },

    keyFeature: { type: String },
    specification: { type: String },
    description: { type: String, required: true },
    color: { type: String, required: true },

    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);
const ProductDetailsModel = mongoose.model("productdetails", DataSchema);
module.exports = ProductDetailsModel;
