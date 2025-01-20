const user = require("../models/user");
const mongoose = require("mongoose");

const addToCart = async (req, res) => {
  try {
    let userData = await user.findById(req.user.userId);
    let cartData = await userData.cart;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await user.findByIdAndUpdate(req.user.userId, { cart: cartData });
    console.log("Added to cart");
    res.send("Added to cart");
  } catch (err) {
    console.log(err);
    res.send("Error!");
  }
};
//remove items from the cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await user.findById(req.user.userId);
    let cartData = await userData.cart;
    if (cartData[req.body.itemId] > 1) {
      cartData[req.body.itemId] -= 1;
      await user.findByIdAndUpdate(req.user.userId, { cart: cartData });
    } else if (cartData[req.body.itemId] == 1) {
      await user.findByIdAndUpdate(req.user.userId, {
        $unset: { [`cart.${req.body.itemId}`]: 0 }, // Remove the item from the cart
      });
    }
    console.log("Removed From Cart");
    res.send("removed from cart");
  } catch (err) {
    console.log("Error1");
  }
};
//fetch cart data
const getCart = async (req, res) => {
  try {
    let userData = await user.findById(req.user.userId);
    let cartData = await userData.cart;
    // console.log(cartData, userData);

    res.json({ cartData });
  } catch (err) {
    console.log("Error!");
  }
};
//for deleting
const deleteCart = async (req, res) => {
  try {
    let userData = await user.findById(req.user.userId);
    let cartData = await userData.cart;

    if (cartData[req.body.itemId]) {
      await user.findByIdAndUpdate(req.user.userId, {
        $unset: { [`cart.${req.body.itemId}`]: 0 }, // Remove the item from the cart
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addToCart, removeFromCart, getCart, deleteCart };
