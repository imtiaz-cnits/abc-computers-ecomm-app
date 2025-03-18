const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    invoiceID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "invoiceproducts" },
    subTotal: { type: String, required: true },
    discount: { type: String, required: true },
    grandTotal: { type: String, required: true },
    pay_method: { type: String, required: true },
    tran_id: { type: String },
    acc_number: { type: String },
    payment_status: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);
const PaymentModel = mongoose.model("payments", DataSchema);
module.exports = PaymentModel;
