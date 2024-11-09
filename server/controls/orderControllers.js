const orderModel = require("../models/orderModel");
const orderSchedule = async (res, req) => {
  const { userId } = req.user;
  const { items, totalAmount, deliveryFee, date } = req.body.cartData;

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
            orderedItems: items,
            totalAmount: totalAmount,
            deliveryFee: deliveryFee,
            date: date,
          },
        },
        { new: true } // Return the updated document
      );
      res.status(200).send("Order updated successfully.");
    } else {
      const newOrder = new Order({
        userId: userId,
        orderedItem: items,
        totalAmount: totalAmount,
        deliveryFee: deliveryFee,
        date: date,
      });

      await newOrder.save();

      res.status(201).send("Order created successfully.");
    }
  } catch (error) {
    console.error("Error scheduling order:", error);
    res.status(500).send("An error occurred while scheduling the order.");
  }
};
module.exports = orderSchedule;
