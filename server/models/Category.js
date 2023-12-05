const mongoose = require("mongoose");
const attributeSchema = new mongoose.Schema({
  name: String,
  required: Boolean,
  type: String,
});

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    attributes: [attributeSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
