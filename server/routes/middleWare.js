const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Customer = require("../models/Customer");
const Seller = require("../models/Seller");
const Admin = require("../models/Admin");

function verifyToken(req, res, next) {
  let token = req.headers.authorization;
  token = token.match(/"([^"]+)"/)[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }
  jwt.verify(token, process.env.TOKEN_SC, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.id;
    next();
  });
}



module.exports = {
  verifyToken,

};
