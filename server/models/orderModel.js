const mongoose = require("mongoose");
const { type } = require("server/reply");
const orderSchema = new mongoose.Schema({
  userId: { types: String },
  orderedItems: { types: Array },
  totalAmount: { types: String },
  address: { types: String },
  paymentStatus: { type: String, default: "false" },
  date: { type: Date, default: Date.now() },
  orderStatus: { type: String, default: "Onprocess" },
  deliveryFee: { type: String },
});
const orderModel = mongoose.model("Orders", orderSchema);
module.exports = orderModel;
