const order = require("../models/orderModel");
const workerModel = require("../models/workersModel");
const assignedWorkerModel = require("../models/assignedWorkerModel");
const mongoose = require("mongoose");

const orderUpdate = async (req, res) => {
  const orderId = req.body.orderId;
  const orderStatus = req.body.newStatus;

  try {
    // Update the order status
    const update = await order.findById(
      orderId
    );

    if(orderStatus === "Partially Completed"){
      const completedItems = req.body.items;
      console.log("Partially Completed Items:",completedItems);
      // update.completedItems.push(completedItems);
    }

    if (orderStatus === "Completed") {
      const update = await order.findByIdAndUpdate(
        orderId,
        {
          $set: {
            orderStatus: orderStatus,
          },
        },
        { new: true }
      );
      // Find the worker associated with this order
      const orderDetails = await order.findById(orderId);
      const workerId = orderDetails.assignedWorkerId; // Assuming `workerId` is stored in the order model

      if (workerId) {
        const id = orderId;
        const filter = new mongoose.Types.ObjectId(id);
        // Calculate the total time taken
        const workerAssignedDetails = await assignedWorkerModel.findOne({
          orderId: filter,
        });
        // Calculate the total time taken
        const createdAt = new Date(workerAssignedDetails.createdAt); // A
        const currentTime = new Date();
        const timeTaken = Math.floor((currentTime - createdAt) / (1000 * 60)); // Time in minutes
        console.log("Created At:", createdAt);
        console.log("Current Time:", currentTime);
        console.log("Time Taken (minutes):", timeTaken);

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
        const { ObjectId } = require("mongodb"); // or mongoose.Types.ObjectId if you're using Mongoose

        // Example

        const workerAssigned = await assignedWorkerModel.findOneAndUpdate(
          { orderId: filter },
          {
            $set: { timeTakenToCompleteWorks: timeTaken, status: "Done" },
          }
        );
        // Retrieve all completed works for the worker
        const completedWorks = await assignedWorkerModel.find(
          { workerId, status: "Done" } // Filter for completed tasks by this worker
          // { timeTakenToCompleteWorks: 1 }
        );

        let totalTimeTaken = 0;
        let completedCount = 0;

        for (let i = 0; i < completedWorks.length; i++) {
          const work = completedWorks[i];
          if (work.timeTakenToCompleteWorks) {
            // console.log(i + "    " + work.timeTakenToCompleteWorks);
            totalTimeTaken += parseInt(work.timeTakenToCompleteWorks);
            completedCount++;
          }
        }

        // Calculate average time taken
        console.log(totalTimeTaken);
        console.log(completedCount);
        const averageTimeTaken =
          completedCount > 0 ? Math.floor(totalTimeTaken / completedCount) : 0;
        // console.log(averageTimeTaken);

        // Update the worker's average time taken
        await workerModel.findByIdAndUpdate(workerId, {
          $set: { averageTimeTaken: averageTimeTaken },
        });

        if (worker) {
          console.log("Worker stats updated successfully");
        }

        // Recalculate popularity based on total completed work
        const scalingFactor = 3; // Define how many works correspond to one popularity increment
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
