const workersModel = require("../models/workersModel");
// const validateWorker = async (username, passsword) => {
//   const worker = await workersModel.find({
//     userName: username,
//     password: passsword,
//   });
//   return worker;
// };
const postWorker = async (worker) => {
  try {
    const workerResponse = await workersModel.create(worker); // Save worker to DB
    return workerResponse;
  } catch (error) {
    console.log(error);
  }
};
const getWorker = async (workerId) => {
  const worker = await workersModel.findById(workerId);
  return worker;
};
const updateWorker = async (workerId, workerDetials) => {
  const worker = await workersModel.findByIdAndUpdate(workerId, workerDetials);
  return worker;
};
const deleteWorker = async (workerId) => {
  try {
    const workerToDelete = await workersModel.findById(workerId);
    if (workerToDelete != null) {
      await workersModel.findByIdAndDelete(workerId);
    } else {
      return {};
    }
    return workerToDelete;
  } catch (error) {
    throw Error("Error while Deleting Customer");
  }
};
const getAllWorker = async () => {
  return workersModel.find();
};
module.exports = {
  validateWorker,
  postWorker,
  getWorker,
  updateWorker,
  deleteWorker,
  getAllWorker,
};
