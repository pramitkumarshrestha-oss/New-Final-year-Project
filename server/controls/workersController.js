const express = require("express");
const orderModel = require("../models/orderModel");
const assignedWorkerModel = require("../models/assignedWorkerModel");
const workersModel = require("../models/workersModel");
const predict = require("../knn");

const assignWorkerHandler = async (req, res, next) => {
  const { orderId } = req.body;
  try {
    const work = await assignedWorkerModel.findOne({ orderId });
    if (work)
      return res.status(200).json({
        message: "The provided order has already been assigned to a worker",
      });

    // find a worker that is not working currently
    const allWorkers = await workersModel.find({}, { _id: 1 });
    const workingWorker = (
      await assignedWorkerModel.find({}, { workerId: 1 })
    ).map((worker) => worker.workerId.toString());

    const freeWorkers = allWorkers.filter(
      (worker) => !workingWorker.includes(worker.id)
    );

    if (freeWorkers?.length) {
      const workerId = freeWorkers[0].id;
      const workerDetails = await workersModel.findById(workerId, {
        name: 1,
      });
      const workerName = workerDetails.name;
      await assignedWorkerModel.create({ orderId, workerId });
      await orderModel.updateOne(
        { _id: orderId },
        { assignedWorkerId: workerId }
      );
      await workersModel.updateOne(
        { _id: workerId },
        { $inc: { totalNumberOfWorks: 1 } }
      );
      return res.status(200).json({
        message: "Worker assigned successfully",
        workerId,
        workerName,
      });
    }

    // If no free worker is found, use knn to assign a worker
    const eligibleWorkers = [];

    await Promise.all(
      workingWorker.map(async (workerId) => {
        const workerDetails = await workersModel.findById(workerId, {
          popularity: 1,
        });
        if (!workerDetails) return;

        // const totalNumberOfWorks = await assignedWorkerModel.countDocuments({
        //   workerId: workerId,
        //   status: "Working",
        // });
        const workerDetails1 = await workersModel.findOne(
          { _id: workerId },
          { totalNumberOfWorks: 1 }
        );
        const totalNumberOfWorks = workerDetails
          ? workerDetails1.totalNumberOfWorks
          : 0;

        const answer = predict(
          totalNumberOfWorks,
          workerDetails?.popularity || 0
        );

        if (answer === "yes") {
          eligibleWorkers.push({
            workerId,
            popularity: workerDetails.popularity,
            totalNumberOfWorks,
          });
        }
      })
    );
    console.log("raw" + JSON.stringify(eligibleWorkers));

    if (!eligibleWorkers?.length)
      return res.status(200).json({ message: "No Free Worker Found" });

    // Sort by totalNumberOfWorks first, then by popularity if equal
    const ab = eligibleWorkers.sort((a, b) => {
      if (a.totalNumberOfWorks !== b.totalNumberOfWorks) {
        return a.totalNumberOfWorks - b.totalNumberOfWorks;
      }
      return b.popularity - a.popularity; // Higher popularity if works are the same
    });
    console.log("refined" + JSON.stringify(ab));
    const workerDetails = ab[0];
    const workerId = workerDetails.workerId;
    const workerRecord = await workersModel.findById(workerId);
    const workerName = workerRecord?.name;

    await assignedWorkerModel.create({ orderId, workerId });
    await orderModel.updateOne(
      { _id: orderId },
      { assignedWorkerId: workerId }
    );
    await workersModel.updateOne(
      { _id: workerId },
      { $inc: { totalNumberOfWorks: 1 } }
    );

    return res.status(200).json({
      message: "Worker assigned successfully",
      workerId,
      workerName,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports = assignWorkerHandler;
