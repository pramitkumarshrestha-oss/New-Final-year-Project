const express = require("express");
const {
  getAllWorker,
  getWorker,
  postWorker,
  updateWorker,
  deleteWorker,
  validateWorker,
} = require("../services/workersServices");

const getAllWorkerHandler = async (req, res, next) => {
  try {
    const worker = await getAllWorker();
    return res.status(200).send(worker);
  } catch (error) {
    return next(error);
  }
};
const getWorkerHandler = async (req, res, next) => {
  const { workerId } = req.params;
  if (!workerId.match(/^[0-9a-fA-F]{24}$/)) {
    // Validate customer ID format
    return res.status(200).json("Invalid Id Format"); // Return invalid ID format message
  }
  try {
    const worker = await getWorker(workerId); // Fetch customer by ID
    res.status(200).json(worker); // Send back customer data
  } catch (error) {
    return next(error); // Pass error to the next middleware
  }
};
const postWorkerHandler = async (req, res, next) => {
  const workerBody = req.body;

  try {
    const worker = await postWorker(workerBody); // Add a new customer to the database
    return res.status(200).json(worker); // Return the newly added customer data
  } catch (error) {
    return next(error); // Pass error to the next middleware
  }
};
const updateWorkerHandler = async (req, res, next) => {
  const { workerId } = req.params;
  const workerDetials = req.body;

  try {
    const wokerUpadtes = await updateWorker(workerId, workerDetials); // Update customer data
    return res.status(200).json(wokerUpadtes); // Send back updated customer data
  } catch (error) {
    return next(error); // Pass error to the next middleware
  }
};
const deleteWorkerHandler = async (req, res, next) => {
  const { workerId } = req.params;
  if (workerId.match(/^[0-9a-fA-F]{24}$/)) {
    // Validate customer ID format
    const workerToDelete = await deleteWorker(workerId); // Delete customer by ID
    if (!(Object.keys(workerToDelete || {}).length === 0)) {
      // Check if customer exists before deleting
      return res
        .status(200)
        .json(`Successfully deleted customer with ID ${workerId}`); // Confirm deletion
    } else {
      return res.status(404).json(`Customer with ID ${workerId} not found`); // Customer not found
    }
  } else {
    return res.status(400).json("The Object ID is not valid"); // Invalid ID format message
  }
};
const verifyWorkerValidator = async (req, res, next) => {
  const workerCred = req.body;
  const worker = await validateWorker(workerCred.userName, workerCred.password); // Validate credentials
  return res.status(200).send(worker); // Send validation result
};
module.exports = {
  getAllWorkerHandler,
  getWorkerHandler,
  postWorkerHandler,
  updateWorkerHandler,
  deleteWorkerHandler,
  verifyWorkerValidator,
};
