const secretKey = process.env.JWT_SECRET;
const axios = require("axios");
const orderModel = require("../models/orderModel");
const user = require("../models/user");
const verifyPayment = async (req, res) => {
  try {
    const { pidx } = req.body;
    const headers = {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      { headers }
    );
    // console.log(response.data);
    if (response.data.status === "Completed") {
      const { userId } = req.user;
      const orderStatus = "Onprocess";
      const alreadySaveOrder = await orderModel.findOne({
        userId: userId,
        orderStatus: orderStatus,
      });
      if (alreadySaveOrder !== null) {
        const orderId = alreadySaveOrder._id.toString();
        try {
          await orderModel.findOneAndUpdate(
            { _id: orderId },
            {
              $set: {
                orderStatus: "processedWithPayment",
                paymentStatus: "paid",
                paymentDetails: response.data,
                paymentMode: "Khalti",
              },
            },
            { new: true }
          );
        } catch (err) {
          console.log("error while updating payment status" + err);
        }
        try {
          const h = await user.findOneAndUpdate(
            { _id: userId },
            {
              $unset: {
                cart: {},
              },
            },
            { new: true }
          );
          // console.log(h);
        } catch (err) {
          console.log("error while removing item from cart" + err);
        }
      }
    }
    res.send(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to lookup payment" });
  }
};
module.exports = verifyPayment;
