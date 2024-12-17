const orderModel = require("../models/orderModel");
const user = require("../models/user");
const addProduct = require("../models/addProduct");
const workersModel = require("../models/workersModel");
const adminDashboard = async (req, res) => {
  
  try {
    let amount = 0;
    const orders = await orderModel.find();
    if (orders && orders.length > 0) {
      for (i = 0; i < orders.length; i++) {
        amount += orders[i].totalAmount;
      }
    }
    const totalOrders = await orderModel.countDocuments();
    const totalOrdersCompleted = await orderModel.countDocuments({
      orderStatus: "Completed",
    });
    const totalPendingOrders = await orderModel.countDocuments({
      orderStatus: { $in: ["inProgress", "processedWithPayment"] },
    });
    const totalCustomers = await user.countDocuments();
    const totalWorkers = await workersModel.countDocuments();
    const totalProduct = await addProduct.countDocuments();
    res.status(200).json({
      totalAmount: amount,
      totalOrders: totalOrders,
      totalCustomers: totalCustomers,
      totalWorkers: totalWorkers,
      totalOrdersCompleted: totalOrdersCompleted,
      totalPendingOrders: totalPendingOrders,
      totalProduct: totalProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error" + err);
  }
};
module.exports = adminDashboard;
