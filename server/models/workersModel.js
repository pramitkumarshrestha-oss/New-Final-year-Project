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
    default: 1,
  },
  citizenshipNumber: {
    type: String,
  },
  totalNumberOfWorks: { type: Number, default: 0 },
  joinedDate: {
    type: String,
  },
  totalNumberOfActiveWorks: { type: Number },
});
const workersModel = mongoose.model("Workers", workersSchema);
module.exports = workersModel;
