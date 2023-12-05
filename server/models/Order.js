const mongoose = require("mongoose");
// var Float = require("mongoose-float").loadType(mongoose, 4);

const OrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        status: { type: String, default: "New" },
        finalStage: { type: Boolean, default: false },
        
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
