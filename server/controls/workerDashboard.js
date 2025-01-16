const workersModel = require("../models/workersModel");
const workerDashboard = async (req, res) => {
  console.log("hello");
  const { workerId } = req.user;
  // console.log(workerId);
  try {
    const workers = await workersModel.findById(
      workerId,
      "totalNumberOfWorks totalNumberOfCompletedWorks popularity"
    );
    res.status(200).json(workers);
  } catch (error) {
    console.error(error);
  }
};
module.exports = workerDashboard;
