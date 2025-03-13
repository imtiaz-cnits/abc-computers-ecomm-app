const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
    {
        profileID: { type: mongoose.Schema.Types.ObjectId, ref: 'profiles' },
        productID: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
        order_notes: { type: String },
        color: { type: String },
        disc_price: { type: Number },
        qty: { type: Number },
    },
    { timestamps: true, versionKey: false }
);
const OrderDetailsModel = mongoose.model("orderdetails", DataSchema);
module.exports = OrderDetailsModel;