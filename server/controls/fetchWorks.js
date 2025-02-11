const express = require("express");
const orderModel = require("../models/orderModel");
const assignedWorkerModel = require("../models/assignedWorkerModel");
const workersModel = require("../models/workersModel");

const getAllWorkersWithOrdersHandler = async (req, res, next) => {
  const workerId = req.user.workerId;
  
  try {
    const workers = await workersModel.find({}, { _id: 1, name: 1 });
    const assignedOrders = await assignedWorkerModel
      .find({})
      .populate("orderId")
      .populate("workerId");
    const result = workers.map((worker) => {
      const workerOrders = assignedOrders
        .filter((assignment) => {
          return (
            assignment.workerId &&
            assignment.workerId._id.toString() === worker._id.toString() &&
            assignment.orderId
          );
        })
        .map((assignment) => ({
          orderId: assignment.orderId._id,
          orderedItems: assignment.orderId.orderedItems,
          totalAmount: assignment.orderId.totalAmount,
          orderStatus: assignment.orderId.orderStatus,
          paymentStatus: assignment.orderId.paymentStatus,
          completedItems: assignment.orderId.completedItems,
          deliveryFee: assignment.orderId.deliveryFee,
          assignedAt: assignment.createdAt,
        }));

      return {
        workerId: worker._id,
        workerName: worker.name,
        orders: workerOrders,
      };
    });

    const filteredWorkers = result.filter(worker => worker.workerId.toString() === workerId);

    return res.status(200).json({
      message: "Workers and their orders fetched successfully",
      workers: filteredWorkers,
    });
  } catch (error) {
    console.error("Error fetching workers with orders:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports = getAllWorkersWithOrdersHandler;