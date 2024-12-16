const order = require("../models/orderModel");
const workerModel = require("../models/workersModel");

const orderUpdate = async (req, res) => {
  const orderId = req.body.orderId;
  const orderStatus = req.body.newStatus;

  try {
    // Update the order status
    const update = await order.findByIdAndUpdate(
      orderId,
      {
        $set: {
          orderStatus: orderStatus,
        },
      },
      { new: true }
    );

    if (orderStatus === "Completed") {
      // Find the worker associated with this order
      const orderDetails = await order.findById(orderId);
      const workerId = orderDetails.assignedWorkerId; // Assuming `workerId` is stored in the order model

      if (workerId) {
        // Update total work stats
        const worker = await workerModel.findByIdAndUpdate(
          workerId,
          {
            $inc: {
              totalNumberOfWorks: -1,
              totalNumberOfCompletedWorks: 1,
            },
          },
          { new: true } // Return the updated worker data
        );
        if (worker) {
          console.log("sandesh");
        }
        // Recalculate popularity based on total completed work
        const scalingFactor = 10; // Define how many works correspond to one popularity increment
        const newPopularity = Math.min(
          5,
          Math.max(
            1,
            Math.floor(worker.totalNumberOfCompletedWorks / scalingFactor)
          )
        );

        // Update the worker's popularity
        await workerModel.findByIdAndUpdate(workerId, {
          $set: {
            popularity: newPopularity,
          },
        });
      }
    }

    res.status(200).json({ message: "Order and worker updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports = orderUpdate;
