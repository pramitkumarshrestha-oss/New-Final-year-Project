const workersModel = require("../models/workersModel");
const editWorker = async (req, res) => {
  const {
    name,
    phoneNumber,
    address,
    username,
    password,
    gender,
    age,
    citizenshipNumber,
  } = req.body;
  try {
    const updatedWorker = await workersModel.findByIdAndUpdate(id, {
      $set: {
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        username: username,
        password: password,
        gender: gender,
        age: age,
        citizenshipNumber: citizenshipNumber,
      },
    });
    if (updatedWorker) {
      console.log("Worker updated successfully");
      res.status(200).json({ message: "Product updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating Worker" });
  }
};

const deleteWorker = async (req, res) => {
  const { id } = req.parms;
  try {
    const deletedWorker = await workersModel.findByIdAndDelete(id);
    if (deletedWorker) {
      res.status(200).json({ message: "Worker deleted successfully" });
      console.log("Worker deleted successfully");
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting Worker" });
  }
};

module.exports = { editWorker, deleteWorker };
