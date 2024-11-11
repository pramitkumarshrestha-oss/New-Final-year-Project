const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  userId: { types: String },

  orderedItems: { types: Array },

  totalAmount: { types: String },

  paymentStatus: { type: String, default: "Not" },

  orderStatus: { type: String, default: "Onprocess" },

  deliveryFee: { type: String },

  deliveryInfo: {
    type: Object,
  },
  paymentMode: {
    type: String,
  },
  paymentDetails: {
    type: Object,
  },
});
const orderModel = mongoose.model("Orders", orderSchema);
module.exports = orderModel;
