const router = require("express").Router();
const { Product } = require("../models/Product");
const Seller = require("../models/Seller");
const Order = require("../models/Order");
const Customer = require("../models/Customer");
const { verifyToken } = require("./middleWare");
// import { upload } from "..";

router.get("/status", verifyToken, async (req, res) => {
  const userId = req.userId;
  try {
    const user = await Seller.findById(userId);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/products", verifyToken, async (req, res) => {
  const userId = req.userId;
  try {
    const products = await Product.find({ seller: userId });

    res.status(201).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/products/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.findById(id);
    if (products.seller != req.userId) {
      res.status(401).json({ err: "Not Authorized" });
    } else res.status(201).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/createProduct", verifyToken, async (req, res) => {
  const sellerId = req.userId;
  let data = req.body;
  data.seller = sellerId;
  try {
    const newProduct = new Product(data);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;

  const newProduct = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, newProduct, {
      new: true,
    });
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.json({
      success: true,
      message: `Product with ID ${id} updated`,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating product" });
  }
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    await product.remove();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/orders", verifyToken, async (req, res) => {
  const userId = req.userId;

  try {
    // Find products that belong to the seller
    const products = await Product.find({ seller: userId });

    // Create an array to store product IDs
    const productIds = products.map((product) => product._id);
    const orders = await Order.find({
      "products.productId": { $in: productIds },
    });
    // Filter products within each order to include on
    const filteredOrders = orders.map((order) => {
      const filteredProducts = order.products.filter((product) => {
        return productIds.includes(product.productId);
      });

      return {
        ...order._doc,
        products: filteredProducts,
      };
    });
    res.status(200).json(filteredOrders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/order/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  console.log(id);

  try {
    const products = await Product.find({ seller: userId });

    const productIds = products.map((product) => product._id);

    const order = await Order.findById(id);

    const filteredProducts = order.products.filter((product) => {
      return productIds.some(
        (productId) => productId.toString() === product.productId.toString()
      );
    });

    const customer = await Customer.findById(order.customerId);
    let resOrder = {
      ...order,
      products: filteredProducts,
      customer: {
        _id: customer._id,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
      },
    };
    res.status(200).json(resOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/order/updateStatus/:id", async (req, res) => {
  const { id } = req.params;
  const { productId, newStatus } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Find the index of the product with the specified productId in the products array
    const productIndex = order.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in order" });
    }
    if (order.products[productIndex].finalStage)
      return res.status(401).json({ message: "Can not modify" });
    order.products[productIndex].status = newStatus;

    // Save the updated order
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/statistics", verifyToken, async (req, res) => {
  const userId = req.userId;

  try {
    // Find products that belong to the seller
    const products = await Product.find({ seller: userId });

    // Create an array to store product IDs
    const productIds = products.map((product) => product._id.toString());

    // Find orders that contain products from the seller
    const orders = await Order.find({
      "products.productId": { $in: productIds },
    });

    // Initialize statistics object
    const productStatistics = {};

    // Iterate through each product and calculate statistics
    products.forEach((product) => {
      productStatistics[product._id] = {
        product: product.name,
        price: product.price,
        img:product.img,
        statuses: {
          New: 0,
          Shipped: 0,
          Canceled: 0,
          Accepted: 0,
          Rejected: 0,
        },
      };
    });
    // console.log(orders.products)
    // Update statistics based on orders' statuses
    console.log(productIds)
    orders.forEach((order) => {
      order.products.forEach((product) => {
        console.log(order.products)
        if (productIds.includes(product.productId.toString())) {
          console.log(product.productId)
          const status = product.status;
          productStatistics[product.productId].statuses[status] +=
            product.quantity;
        }
      });
    });

    res.status(200).json(productStatistics);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/updateorder/:id", verifyToken, async (req, res) => {
  let id = req.params.id;
  // const userId = req.userId;
  const newOrder = req.body;

  try {
    const orders = await Order.findByIdAndUpdate(id, newOrder, {
      update: true,
    });

    const updatedOrder = await Order.findOneAndUpdate(
      { customerId: userId },
      newOrder,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json("Updated Sucessfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
