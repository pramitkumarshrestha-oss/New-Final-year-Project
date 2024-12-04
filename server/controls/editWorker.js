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
    const updatedWorker = await workersModel.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    );

    if (updatedWorker) {
      console.log("Worker updated successfully");
      res.status(200).json({ message: "Worker updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating Worker" });
  }
};

// For Deleting Worker
const deleteWorker = async (req, res) => {
  const { id } = req.body;
  // Correctly destructure the id from the request parameters
  if (!id) {
    return res.status(400).json({ message: "Worker ID is required" });
  }

  try {
    console.log(id);

    const deletedWorker = await workersModel.findByIdAndDelete(id);
    if (deletedWorker) {
      res.status(200).json({ message: "Worker deleted successfully" });
    } else {
      res.status(404).json({ message: "Worker not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting Worker" });
  }
};

module.exports = { deleteWorker };

module.exports = { editWorker, deleteWorker };
