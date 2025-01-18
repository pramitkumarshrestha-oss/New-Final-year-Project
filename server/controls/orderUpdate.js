const order = require("../models/orderModel");
const workerModel = require("../models/workersModel");
const productDetials = require("../models/addProduct");
const assignedWorkerModel = require("../models/assignedWorkerModel");
const mongoose = require("mongoose");

const orderUpdate = async (req, res) => {
  const orderId = req.body.orderId;
  const orderStatus = req.body.newStatus;

  try {
    if (orderStatus != "Partially Completed") {
      const update = await order.findByIdAndUpdate(
        orderId,
        {
          $set: {
            orderStatus: orderStatus,
          },
        },
        { new: true }
      );
    }

    if (orderStatus === "Partially Completed") {
      const update = await order.findById(orderId);
      console.log("Partially Completed Items:", req.body.items);
      const completedItems = req.body.items;

      // Logging completed items
      console.log("Completed Items:", completedItems);

      const standardTime = []; // To store standard time values from productDetails
      const actualTimes = []; // To store actual times taken for each completed item
      const deviations = []; // To store the deviation for each item

      // Iterate through completedItems to get the standard time and actual time
      for (const item of completedItems) {
        try {
          const timedata = await productDetials.findOne({ name: item });
          if (timedata) {
            standardTime.push(timedata.standardTime);

            const workerAssignedDetails = await assignedWorkerModel.findOne({
              orderId: orderId,
              workerId: update.assignedWorkerId,
            });
            const createdAt = new Date(workerAssignedDetails.createdAt);
            const currentTime = new Date();
            let actualTime = Math.floor(
              (currentTime - createdAt) / (1000 * 60 * 60)
            );
            if (actualTime <= 0) {
              actualTime = 1;
            }
            actualTimes.push(actualTime);

            const deviation = actualTime - timedata.standardTime;
            deviations.push(deviation);
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }
      const totalDeviation = deviations.reduce(
        (sum, deviation) => sum + deviation,
        0
      );
      const averageDeviation = totalDeviation / deviations.length;

      console.log("Standard Time for each item:", standardTime);
      console.log("Actual Time for each item:", actualTimes);
      console.log("Deviations for each item:", deviations);
      console.log("Average Deviation:", averageDeviation);

      update.completedItems = completedItems;
      update.averageTime += averageDeviation;
      await update.save();
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
      //Check the remaing items in completedItems
      const missingInCompletedItems = update.orderedItems.filter(
        (item) => !update.completedItems.includes(item)
      );
      console.log("Missing Items in Completed Items:", missingInCompletedItems);
      const standardTime = []; // To store standard time values from productDetails
      const actualTimes = []; // To store actual times taken for each completed item
      const deviations = []; // To store the deviation for each item

      // Iterate through completedItems to get the standard time and actual time
      for (const item of missingInCompletedItems) {
        try {
          const timedata = await productDetials.findOne({ name: item.name });
          if (timedata) {
            standardTime.push(timedata.standardTime);

            const workerAssignedDetails = await assignedWorkerModel.findOne({
              orderId: orderId,
              workerId: update.assignedWorkerId,
            });
            const createdAt = new Date(workerAssignedDetails.createdAt);
            const currentTime = new Date();
            let actualTime = Math.floor(
              (currentTime - createdAt) / (1000 * 60 * 60)
            );
            if (actualTime <= 0) {
              actualTime = 1;
            }
            actualTimes.push(actualTime);

            const deviation = actualTime - timedata.standardTime;
            deviations.push(deviation);
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }
      const totalDeviation = deviations.reduce(
        (sum, deviation) => sum + deviation,
        0
      );
      const averageDeviation = totalDeviation / deviations.length;

      console.log("Standard Time for each item:", standardTime);
      console.log("Actual Time for each item:", actualTimes);
      console.log("Deviations for each item:", deviations);
      console.log("Average Deviation:", averageDeviation);

      update.averageTime += averageDeviation;
      await update.save();

      for (item in update.orderedItems) {
        update.completedItems.push(item.name);
      }
      // Find the worker associated with this order
      const orderDetails = await order.findById(orderId);
      const workerId = orderDetails.assignedWorkerId; // Assuming `workerId` is stored in the order model

      if (workerId) {
        const id = orderId;
        // Update total work stats
        const worker = await workerModel.findByIdAndUpdate(
          workerId,
          {
            $inc: {
              totalNumberOfWorks: -1,
              totalNumberOfCompletedWorks: 1,
            },
          },

          { new: true }
        );
        // Retrieve all completed works for the worker
        const completedWorks = await assignedWorkerModel
          .find({ workerId, status: "Done" })
          .populate("orderId");

        // Calculate the average time taken for the worker
        let totalAverageTime = 0;
        for (const work of completedWorks) {
          totalAverageTime += work.orderId.averageTime;
        }
        const averageTime = totalAverageTime / completedWorks.length;
        console.log("Average Time:", averageTime);
        worker.averageTime = averageTime;
        await worker.save();

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
