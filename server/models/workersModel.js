const mongoose = require("mongoose");
const workersSchema = mongoose.Schema({
  name: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    unique: true,
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
});
const workersModel = mongoose.model("Workers", workersSchema);
module.exports = workersModel;
