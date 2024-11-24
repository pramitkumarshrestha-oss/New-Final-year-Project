const order = require("../models/orderModel");
const user = require("../models/user");
const customersOrder = async (req, res) => {
  const { userId } = req.user;
  try {
    const orders = await order.find({ userId: userId });
    // console.log(orders);
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};
module.exports = { customersOrder };
