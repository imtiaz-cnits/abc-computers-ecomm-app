const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    title: { type: String },
    des: { type: String },
    img: { type: String },

    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);
const HeroSliderModel = mongoose.model("herosliders", DataSchema);
module.exports = HeroSliderModel;
