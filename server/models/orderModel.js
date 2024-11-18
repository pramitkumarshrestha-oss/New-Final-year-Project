const mongoose = require("mongoose")

const { ObjectId } = mongoose.Schema.Types
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
    assignedWorkerId: {
      type: ObjectId,
      ref: "Workers",
    },
  },
  { timestamps: true }
)
const orderModel = mongoose.model("Orders", orderSchema)
module.exports = orderModel
