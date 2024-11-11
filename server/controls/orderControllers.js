const orderModel = require("../models/orderModel");
const orderSchedule = async (req, res) => {
  // console.log("mamamamamama");
  const { userId } = req.user;
  // console.log("Hellooooooooooo");
  const { items, totalAmount, deliveryFee } = req.body.cartData;
  const deliveryInfo = req.body.deliveryInfo;
  const orderStatus = "Onprocess";
  try {
    const existingOrder = await orderModel.findOne({
      userId: userId,
      orderStatus: orderStatus,
    });
    if (existingOrder) {
      await orderModel.findByIdAndUpdate(
        existingOrder._id, // Find the order by its ID
        {
          $set: {
            userId: userId,
            orderedItems: items,
            totalAmount: totalAmount,
            deliveryFee: deliveryFee,
            deliveryInfo: deliveryInfo,
          },
        },
        { new: true } // Return the updated document
      );
      res.status(200).send("Order updated successfully.");
    } else {
      const newOrder = new orderModel({
        userId: userId,
        orderedItems: items,
        totalAmount: totalAmount,
        deliveryFee: deliveryFee,
        deliveryInfo: deliveryInfo,
      });
      console.log("order");

      await newOrder.save();

      res.status(201).send("Order created successfully.");
    }
  } catch (error) {
    console.error("Error scheduling order:", error);
    res.status(500).send("An error occurred while scheduling the order.");
  }
};
module.exports = orderSchedule;
