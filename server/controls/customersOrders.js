const orderModel = require("../models/orderModel");
const order = require("../models/orderModel");
const user = require("../models/user");
const customersOrder = async (req, res) => {
  const { userId } = req.user;
  // console.log(userId);
  try {
    const orders = await order.find({ userId: userId });
    // console.log(orders);
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};
const userProfile = async (req, res) => {
  const { userId } = req.user;
  try {
    const users = await user.findById(userId);
    if (!users) {
      return res.status(404).send("User not found");
    }
    // const orders = orderModel.findById(userId);
    const totalPendingOrders = await orderModel.countDocuments({
      userId,
      orderStatus: { $in: ["inProgress", "processedWithPayment"] },
    });
    const totalOrdersCompleted = await orderModel.countDocuments({
      userId,
      orderStatus: "Completed",
    });
    res.status(200).json({
      userName: users.userName,
      email: users.email,
      phoneNumber: users.phoneNumber,
      totalPendingOrders: totalPendingOrders,
      totalOrdersCompleted: totalOrdersCompleted,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { customersOrder, userProfile };
