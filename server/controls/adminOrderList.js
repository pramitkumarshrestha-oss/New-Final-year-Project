const orderModel = require("../models/orderModel");
const user = require("../models/user");
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).populate("assignedWorkerId");

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
module.exports = listOrders;
