const express = require("express")
const {
  getAllWorkerHandler,
  getWorkerHandler,
  verifyWorkerValidator,
  postWorkerHandler,
  updateWorkerHandler,
  deleteWorkerHandler,
  assginWorkerHandler,
} = require("../controls/workersController")
const workerRouter = express.Router()
workerRouter.get("/", getAllWorkerHandler)
workerRouter.get("/:WorkerId", getWorkerHandler)
workerRouter.post("/verify", verifyWorkerValidator)
workerRouter.post("/", postWorkerHandler)
workerRouter.patch("/:workerId", updateWorkerHandler)
workerRouter.delete("/:workerId", deleteWorkerHandler)

workerRouter.post("/assign/:orderId", assginWorkerHandler)
module.exports = workerRouter
