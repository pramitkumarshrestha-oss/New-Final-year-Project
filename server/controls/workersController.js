const express = require("express");
const orderModel = require("../models/orderModel");
const assignedWorkerModel = require("../models/assignedWorkerModel");
const workersModel = require("../models/workersModel");
const predict = require("../knn");

const assginWorkerHandler = async (req, res, next) => {
  const { orderId } = req.params;

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
      const updatedOrder = await orderModel.updateOne(
        { _id: orderId },
        { assignedWorkerId: workerId }
      );
      await workersModel.updateOne(
        { _id: workerId },
        { $inc: { totalNumberOfWorks: 1 } }
      );
      return res.status(200).json({
        message: "Worker assigned sucessfully",
        workerId,
        workerName,
      });
    }

    //if no free worker is found use knn to aasign a worker
    const elligableWorker = [];

    await Promise.all(
      workingWorker.map(async (workerId) => {
        const popularity = await workersModel.findById(
          { _id: workerId },
          { popularity: 1 }
        );

        const totalNumberOfWorks = await assignedWorkerModel.countDocuments({
          workerId: workerId,
          status: "Working",
        });

        const answer = predict(totalNumberOfWorks, popularity.popularity || 0);

        if (answer === "yes") elligableWorker.push(workerId);
      })
    );

    if (!elligableWorker?.length)
      return res.status(200).json({ message: "No Feee Worker Found" });
    console.log(elligableWorker);

    const workerId = elligableWorker[0];
    const workerDetails = await workersModel.findById(workerId, { name: 1 });
    const workerName = workerDetails.name;
    await assignedWorkerModel.create({ orderId, workerId });
    const updatedOrder = await orderModel.updateOne(
      { _id: orderId },
      { assignedWorkerId: workerId }
    );
    await workersModel.updateOne(
      { _id: workerId },
      { $inc: { totalNumberOfWorks: 1 } }
    );
    return res.status(200).json({
      message: "Worker assigned sucessfully",
      workerId,
      workerName,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = assginWorkerHandler;
