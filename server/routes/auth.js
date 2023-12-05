const router = require("express").Router();
const Customer = require("../models/Customer");
const Seller = require("../models/Seller");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { verifyToken } = require("./middleWare");
// import { upload } from "..";
//REGISTER
router.post("/register/customer", async (req, res) => {
  try {
    const user = await Customer.findOne({
      $or: [{ phone: req.body.phone }, { email: req.body.email }],
    });
    if (user) {
      res.status(400).json({ error: "Email or Phone exist" });
      return;
    } else {
      const newUser = new Customer({
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        password: await bcrypt.hash(req.body.password, 10),
      });

      await newUser.save();
      console.log(newUser);
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/register/seller", async (req, res) => {
  const newUser = new Seller({
    phone: req.body.phone,
    email: req.body.email,
    businessName: req.body.businessName,
    password: await bcrypt.hash(req.body.password, 10),
  });
  try {
    const user = await Customer.findOne({
      $or: [{ phone: req.body.phone }, { email: req.body.email }],
    });
    if (user) {
      res.status(400).json({ error: "Email of Phone exist" });
      return;
    } else {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login/customer", async (req, res) => {
  try {
    console.log(req.body);
    const user = await Customer.findOne({
      $or: [{ phone: req.body.username }, { email: req.body.username }],
    });
    console.log(user);
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
      return res.status(401).json("Wrong credentials!");

    const token = jwt.sign(
      { id: user._id, role: "customer" },
      process.env.TOKEN_SC,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login/seller", async (req, res) => {
  try {
    const user = await Seller.findOne({
      $or: [{ phone: req.body.username }, { email: req.body.username }],
    });
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
      return res.status(401).json("Wrong credentials!");

    const token = jwt.sign(
      { id: user._id, role: "seller" },
      process.env.TOKEN_SC,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login/admin", async (req, res) => {
  try {
    const user = await Admin.findOne({
      username: req.body.username,
    });
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
      return res.status(401).json("Wrong credentials!");

    const token = jwt.sign(
      { id: user._id, role: "admin" },
      process.env.TOKEN_SC,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/createAdmin", async (req, res) => {
  const newUser = new Admin({
    username: "admin@2023",
    password: await bcrypt.hash("1", 10),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
