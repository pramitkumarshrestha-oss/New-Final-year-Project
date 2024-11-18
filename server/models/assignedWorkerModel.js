const mongoose = require("mongoose")

const { ObjectId } = mongoose.Schema.Types
const assignedWorkerSchema = new mongoose.Schema(
  {
    orderId: {
      type: ObjectId,
      ref: "Orders",
    },
    workerId: {
      type: ObjectId,
      ref: "Workers",
    },
    status: {
      type: String,
      enum: ["Working", "Done"],
      default: "Working",
    },
  },
  { timestamps: true }
)
const assignedWorkerModel = mongoose.model(
  "assignedWorker",
  assignedWorkerSchema
)
module.exports = assignedWorkerModel
