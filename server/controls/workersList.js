const workersModel = require("../models/workersModel");
const listWorkers = async (req, res) => {
  try {
    const worker = await workersModel.find({});
    res.status(200).json(worker);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
module.exports = listWorkers;
