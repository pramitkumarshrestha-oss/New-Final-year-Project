const express = require("express");
const {
  getAllWorkerHandler,
  getWorkerHandler,
  verifyWorkerValidator,
  postWorkerHandler,
  updateWorkerHandler,
  deleteWorkerHandler,
} = require("../controls/workersController");
const workerRouter = express.Router();
workerRouter.get("/", getAllWorkerHandler);
workerRouter.get("/:WorkerId", getWorkerHandler);
workerRouter.post("/verify", verifyWorkerValidator);
workerRouter.post("/", postWorkerHandler);
workerRouter.patch("/:workerId", updateWorkerHandler);
workerRouter.delete("/:workerId", deleteWorkerHandler);
module.exports = workerRouter;
