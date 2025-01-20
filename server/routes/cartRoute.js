const express = require("express");
const jwtToken = require("../middleWare/jwtToken");
const {
  addToCart,
  removeFromCart,
  getCart,
  deleteCart,
} = require("../controls/cartController");
const router = express.Router();
router.post("/add", jwtToken, addToCart);
router.post("/remove", jwtToken, removeFromCart);
router.get("/get", jwtToken, getCart);
router.get("/get", jwtToken, deleteCart);
module.exports = router;
