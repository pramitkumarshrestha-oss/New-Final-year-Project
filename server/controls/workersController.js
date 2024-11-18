const express = require("express")
const {
  getAllWorker,
  getWorker,
  postWorker,
  updateWorker,
  deleteWorker,
  validateWorker,
} = require("../services/workersServices")
const orderModel = require("../models/orderModel")
const assignedWorkerModel = require("../models/assignedWorkerModel")
const workersModel = require("../models/workersModel")
const predict = require("../knn")

const getAllWorkerHandler = async (req, res, next) => {
  try {
    const worker = await getAllWorker()
    return res.status(200).send(worker)
  } catch (error) {
    return next(error)
  }
}
const getWorkerHandler = async (req, res, next) => {
  const { workerId } = req.params
  if (!workerId.match(/^[0-9a-fA-F]{24}$/)) {
    // Validate worker ID format
    return res.status(200).json("Invalid Id Format") // Return invalid ID format message
  }
  try {
    const worker = await getWorker(workerId) // Fetch worker by ID
    res.status(200).json(worker) // Send back worker data
  } catch (error) {
    return next(error) // Pass error to the next middleware
  }
}
const postWorkerHandler = async (req, res, next) => {
  const workerBody = req.body
  console.log(workerBody)
  try {
    const savedworker = await postWorker(workerBody) // Add a new worker to the database
    console.log("Worker Added")
    return res.status(200).json(savedworker) // Return the newly added worker data
  } catch (error) {
    return next(error) // Pass error to the next middleware
  }
}
const updateWorkerHandler = async (req, res, next) => {
  const { workerId } = req.params
  const workerDetials = req.body

  try {
    const wokerUpadtes = await updateWorker(workerId, workerDetials) // Update worker data
    return res.status(200).json(wokerUpadtes) // Send back updated worker data
  } catch (error) {
    return next(error) // Pass error to the next middleware
  }
}
const deleteWorkerHandler = async (req, res, next) => {
  const { workerId } = req.params
  if (workerId.match(/^[0-9a-fA-F]{24}$/)) {
    // Validate customer ID format
    const workerToDelete = await deleteWorker(workerId) // Delete worker by ID
    if (!(Object.keys(workerToDelete || {}).length === 0)) {
      // Check if worker exists before deleting
      return res
        .status(200)
        .json(`Successfully deleted customer with ID ${workerId}`) // Confirm deletion
    } else {
      return res.status(404).json(`Customer with ID ${workerId} not found`) // worker not found
    }
  } else {
    return res.status(400).json("The Object ID is not valid") // Invalid ID format message
  }
}
const verifyWorkerValidator = async (req, res, next) => {
  const workerCred = req.body
  const worker = await validateWorker(workerCred.userName, workerCred.password) // Validate credentials
  return res.status(200).send(worker) // Send validation result
}

const assginWorkerHandler = async (req, res, next) => {
  const { orderId } = req.params

  try {
    const work = await assignedWorkerModel.findOne({ orderId })
    if (work)
      return res.status(200).json({
        message: "The provided order has already been assigned to a worker",
      })

    //find a worker that is not working currently
    const allWorkers = await workersModel.find({}, { _id: 1 })
    const workingWorker = (
      await assignedWorkerModel.find({}, { workerId: 1 })
    ).map((worker) => worker.workerId.toString())

    const freeWorkers = allWorkers.filter(
      (worker) => !workingWorker.includes(worker.id)
    )

    if (freeWorkers?.length) {
      const workerId = freeWorkers[0].id
      await assignedWorkerModel.create({ orderId, workerId })
      const updatedOrder = await orderModel.updateOne(
        { _id: orderId },
        { assignedWorkerId: workerId }
      )
      return res.status(200).json({
        message: "Worker assigned sucessfully",
        workerId,
      })
    }

    //if no free worker is found use knn to aasign a worker
    const elligableWorker = []

    await Promise.all(
      workingWorker.map(async (workerId) => {
        const popularity = await workersModel.findById(
          { _id: workerId },
          { popularity: 1 }
        )

        const totalNumberOfWorks = await assignedWorkerModel.countDocuments({
          workerId: workerId,
          status: "Working",
        })

        const answer = predict(totalNumberOfWorks, popularity.popularity || 0)

        if (answer === "yes") elligableWorker.push(workerId)
      })
    )

    if (!elligableWorker?.length)
      return res.status(200).json({ message: "No Feee Worker Found" })

    const workerId = elligableWorker[0]
    await assignedWorkerModel.create({ orderId, workerId })
    const updatedOrder = await orderModel.updateOne(
      { _id: orderId },
      { assignedWorkerId: workerId }
    )
    return res.status(200).json({
      message: "Worker assigned sucessfully",
      workerId,
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getAllWorkerHandler,
  getWorkerHandler,
  postWorkerHandler,
  updateWorkerHandler,
  deleteWorkerHandler,
  verifyWorkerValidator,
  assginWorkerHandler,
  assginWorkerHandler,
}
