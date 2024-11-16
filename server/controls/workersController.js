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
    // Validate worker ID format
    return res.status(200).json("Invalid Id Format"); // Return invalid ID format message
  }
  try {
    const worker = await getWorker(workerId); // Fetch worker by ID
    res.status(200).json(worker); // Send back worker data
  } catch (error) {
    return next(error); // Pass error to the next middleware
  }
};
const postWorkerHandler = async (req, res, next) => {
  const workerBody = req.body;
  console.log(workerBody);
  try {
    const savedworker = await postWorker(workerBody); // Add a new worker to the database
    console.log("Worker Added");
    return res.status(200).json(savedworker); // Return the newly added worker data
  } catch (error) {
    return next(error); // Pass error to the next middleware
  }
};
const updateWorkerHandler = async (req, res, next) => {
  const { workerId } = req.params;
  const workerDetials = req.body;

  try {
    const wokerUpadtes = await updateWorker(workerId, workerDetials); // Update worker data
    return res.status(200).json(wokerUpadtes); // Send back updated worker data
  } catch (error) {
    return next(error); // Pass error to the next middleware
  }
};
const deleteWorkerHandler = async (req, res, next) => {
  const { workerId } = req.params;
  if (workerId.match(/^[0-9a-fA-F]{24}$/)) {
    // Validate customer ID format
    const workerToDelete = await deleteWorker(workerId); // Delete worker by ID
    if (!(Object.keys(workerToDelete || {}).length === 0)) {
      // Check if worker exists before deleting
      return res
        .status(200)
        .json(`Successfully deleted customer with ID ${workerId}`); // Confirm deletion
    } else {
      return res.status(404).json(`Customer with ID ${workerId} not found`); // worker not found
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
