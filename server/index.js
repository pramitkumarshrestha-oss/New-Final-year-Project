const express = require("express");
const router = express.Router();
const cors = require("cors");
// const mongoose = require("mongoose");
const { connectToMongoDB } = require("./connections/index");
const app = express();
app.use(cors());
app.use(express.json());

require("dotenv").config();
const mongo = process.env.MONGO;
const port = process.env.PORT;
// console.log(mongo);
connectToMongoDB(mongo)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const signupRoute = require("./routes/signuppage");
const loginRoute = require("./routes/loginpage");

app.use("/signup", signupRoute);
app.use("/login", loginRoute);

app.listen(port, () => {
  console.log(`Server Started At ${port}`);
});
