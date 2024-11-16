const mongoose = require("mongoose");
const workersSchema = mongoose.Schema({
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  userName: {
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
});
const workersModel = mongoose.model("Workers", workersSchema);
module.exports = workersModel;
