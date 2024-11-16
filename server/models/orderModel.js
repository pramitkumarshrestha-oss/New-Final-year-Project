const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    userId: { type: String },

    orderedItems: { type: Array },

    totalAmount: { type: Number },

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
  },
  { timestamps: true }
);
const orderModel = mongoose.model("Orders", orderSchema);
module.exports = orderModel;
