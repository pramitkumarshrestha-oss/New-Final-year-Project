const workersModel = require("../models/workersModel");
const workerDashboard = async (req, res) => {
  try {
    const workers = await workersModel.find(
      {},
      "totalNumberOfWorks totalNumberOfCompletedWorks popularity"
    );
    res.status(200).json(workers);
  } catch (error) {
    console.error(error);
  }
};
module.exports = workerDashboard;
