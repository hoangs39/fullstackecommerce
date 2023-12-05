const mongoose = require("mongoose");
const attributeSchema = new mongoose.Schema({
  name: String,
  required: Boolean,
  type: String,
  value: String,
});
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    attributes: [attributeSchema],
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);

module.exports = { Product, productSchema };
