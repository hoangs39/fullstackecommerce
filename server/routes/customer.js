const router = require("express").Router();
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const { verifyToken } = require("./middleWare");

// router.post("/order", verifyToken, async (req, res) => {
//   const customerId = req.userId;
//   const newOrder = new Order({
//     customerId,
//     desc: item.desc,
//     author: req.body.author,
//     img: req.body.img,
//     categories: req.body.categories,
//     price: req.body.price,
//   });
//   try {
//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.get("/cart", verifyToken, async (req, res) => {
  const customerId = req.userId;
  try {
    const user = await Customer.findById(customerId);
    const cart = user.cart;
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/cart", verifyToken, async (req, res) => {
  const customerId = req.userId;
  const newCart = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { cart: newCart },
      { new: true }
    );

    res.status(200).json(updatedCustomer.cart);
  } catch (err) {
    res.status(500).json({ err, hung: "feef" });
  }
});

router.post("/placeOrder", verifyToken, async (req, res) => {
  const customerId = req.userId;
  const cart = req.body;

  if (cart?.length <= 0) {
    res.status(404).json({ err: "The cart is empty" });
    return;
  }
  let cartFormatted = [];
  cart.map((item) => {
    cartFormatted.push({
      productId: item._id,
      quantity: item.quantity,
    });
  });
  console.log(cartFormatted);
  try {
    const format = {
      customerId,
      products: cartFormatted,
    };
    console.log(format);
    const order = new Order(format);
    console.log(order);
    const savedOrder = await order.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json({ err, hung: "feef" });
  }
});

router.get("/order", verifyToken, async (req, res) => {
  const customerId = req.userId;
  try {
    const orders = await Order.find({ customerId: customerId });
    console.log(orders);
    res.status(201).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/order/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    console.log(order);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/order/updateStatus/:id", async (req, res) => {
  const { id } = req.params;
  const { productId, newStatus } = req.body;

  try {

    if(newStatus !== "Accepted" && newStatus !== "Rejected"){
      return res.status(401).json({ message: "Not accepted Status" });
    }
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const productIndex = order.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in order" });
    }
    if (order.products[productIndex].finalStage && order.products[productId].status !== "Shipped" )
      return res.status(401).json({ message: "Can not modify" });
    order.products[productIndex].status = newStatus;
    order.products[productIndex].finalStage = true;

    // Save the updated order
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
