const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    pay_method: { type: String },
    tran_id: { type: String },
  },
  { timestamps: true, versionKey: false }
);
const PaymentModel = mongoose.model("payments", DataSchema);
module.exports = PaymentModel;
