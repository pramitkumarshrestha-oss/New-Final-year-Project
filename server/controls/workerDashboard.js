const workersModel = require("../models/workersModel");
const workerDashboard = async (req, res) => {
  const workerId = req.user;
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
