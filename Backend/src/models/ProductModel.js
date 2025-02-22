const mongoose = require("mongoose");

const DataSchema = mongoose.Schema({
            productCode: { type: String, required: true },
            productName: { type: String, required: true },
            productStatus: { type: String, required: true, enum: ["active", "inactive"] },
            price: { type: Number, required: true },
            discountPrice: { type: Number, default: 0 },
            keyFeature: { type: String },
            specification: { type: String },
            description: { type: String },
            productImg: { type: String },
            stock: { type: Number, required: true },
            color: { type: String },

            brandID: { type: mongoose.Schema.Types.ObjectId, ref: "brands", required: true },
            categoryID: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true },
            subCategoryID: { type: mongoose.Schema.Types.ObjectId, ref: "subcategories", required: true },
    },
    { timestamps: true, versionKey: false }
);

const ProductModel = mongoose.model("products", DataSchema);
module.exports = ProductModel;