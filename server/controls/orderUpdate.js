const order = require("../models/orderModel");
const orderUpdate = async (req, res) => {
  const orderId = req.body.orderId;
  const orderStatus = req.body.newStatus;
  //   console.log(orderId, orderStatus);
  try {
    const update = await order.findByIdAndUpdate(
      orderId,
      {
        $set: {
          orderStatus: orderStatus,
        },
      },
      { new: true }
    );
    // console.log(update);
    res.status(200).json({ message: "updated" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = orderUpdate;
