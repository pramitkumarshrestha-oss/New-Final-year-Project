const mongoose = require("mongoose");
const workersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  popularity: {
    type: Number,
  },
  citizenshipNumber: {
    type: String,
  },
  joinedDate: {
    type: String,
  },
  totalNumberOfActiveWorks: { type: Number },
});
const workersModel = mongoose.model("Workers", workersSchema);
module.exports = workersModel;
