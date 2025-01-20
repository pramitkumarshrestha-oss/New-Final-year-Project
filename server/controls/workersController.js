const express = require("express");
const orderModel = require("../models/orderModel");
const assignedWorkerModel = require("../models/assignedWorkerModel");
const workersModel = require("../models/workersModel");
const predict = require("../knn");
const mail = require("../controls/mail");

const assignWorkerHandler = async (req, res, next) => {
  const { orderId } = req.body;
  // console.log("sandesh");
  try {
    // console.log("hahahhaha");
    const work = await assignedWorkerModel.findOne({ orderId });
    if (work)
      return res.status(200).json({
        message: "The provided order has already been assigned to a worker",
      });

    // find a worker that is not working currently
    const allWorkers = await workersModel.find({}, { _id: 1 });
    const workingWorker = (
      await assignedWorkerModel.find({ status: "Working" }, { workerId: 1 })
    ).map((worker) => worker.workerId.toString());

    const freeWorkers = allWorkers.filter(
      (worker) => !workingWorker.includes(worker.id)
    );
    console.log(freeWorkers);

    if (freeWorkers?.length) {
      const workerId = freeWorkers[0].id;
      const workerDetails = await workersModel.findById(workerId, {
        name: 1,
        email: 1,
      });
      const workerName = workerDetails.name;
      const workerEmail = workerDetails.email;
      await assignedWorkerModel.create({ orderId, workerId });
      await orderModel.updateOne(
        { _id: orderId },
        { assignedWorkerId: workerId }
      );
      await workersModel.updateOne(
        { _id: workerId },
        { $inc: { totalNumberOfWorks: 1 } }
      );
      await mail(
        workerEmail,
        workerName,
        `You have been assigned a new order with ID: ${orderId}`
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
          totalNumberOfWorks: 1,
          averageTimeTaken: 1,
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
          workerDetails?.popularity || 0,
          workerDetails?.averageTimeTaken || 1
        );

        if (answer === "yes") {
          eligibleWorkers.push({
            workerId,
            popularity: workerDetails.popularity,
            totalNumberOfWorks,
            averageTimeTaken: workerDetails.averageTimeTaken,
          });
        }
      })
    );

    if (!eligibleWorkers?.length)
      return res.status(200).json({ message: "No Free Worker Found" });

    const ab = eligibleWorkers.sort((a, b) => {
      // First, compare by totalNumberOfWorks (ascending)
      if (a.totalNumberOfWorks !== b.totalNumberOfWorks) {
        return a.totalNumberOfWorks - b.totalNumberOfWorks;
      }

      // If totalNumberOfWorks are the same, compare by popularity (descending)
      if (b.popularity !== a.popularity) {
        return b.popularity - a.popularity;
      }

      // If both totalNumberOfWorks and popularity are the same, compare by averageTimeTaken (ascending)
      return a.averageTimeTaken - b.averageTimeTaken;
    });

    const workerDetails = ab[0];
    const workerId = workerDetails.workerId;
    const workerRecord = await workersModel.findById(workerId);
    const workerName = workerRecord?.name;
    const workerEmail = workerRecord?.email;

    await assignedWorkerModel.create({ orderId, workerId });
    await orderModel.updateOne(
      { _id: orderId },
      { assignedWorkerId: workerId }
    );
    await workersModel.updateOne(
      { _id: workerId },
      { $inc: { totalNumberOfWorks: 1 } }
    );
    await mail(
      workerEmail,
      workerName,
      `You have been assigned a new order with ID: ${orderId}`
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
