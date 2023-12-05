const express = require("express");
const router = express.Router();
const { Product } = require("../models/Product");

router.get("/", async (req, res) => {
  const listOfProduct = await Product.find({});
  res.status(200).json(listOfProduct);
});

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product)
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search/:search", async (req, res) => {
  try {
    const listOfProduct = await Product.find({
      title: { $regex: req.params.search },
    });
    res.status(200).json(listOfProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});





module.exports = router;
