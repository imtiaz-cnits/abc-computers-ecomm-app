const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
    {
        productCode: { type: String },
        productName: { type: String },
        productStatus: { type: String },
        price: { type: Number, min: 0 },
        discountPrice: { type: Number, default: 0, min: 0 },
        keyFeature: { type: String },
        specification: { type: String },
        description: { type: String },
        productImg: { type: String, }, // Allow null for productImg
        stock: { type: Number, min: 0 },
        color: { type: [String] }, // Array of colors
        badge: { type: String }, // Add badge field

        brandID: { type: mongoose.Schema.Types.ObjectId, ref: "brands" },
        categoryID: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
        subCategoryID: { type: mongoose.Schema.Types.ObjectId, ref: "subcategories" },
    },
    { timestamps: true, versionKey: false }
);

const ProductModel = mongoose.model("products", DataSchema);
module.exports = ProductModel;