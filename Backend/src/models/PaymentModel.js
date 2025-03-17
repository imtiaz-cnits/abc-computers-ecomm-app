const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    invoiceID: { type: mongoose.Schema.Types.ObjectId, required: true },
    pay_method: { type: String },
    tran_id: { type: String },
    acc_number: { type: String },
  },
  { timestamps: true, versionKey: false }
);
const PaymentModel = mongoose.model("payments", DataSchema);
module.exports = PaymentModel;
