const express = require("express");
const router = express.Router();
const cors = require("cors");
// const mongoose = require("mongoose");
// const productDetials = require("./models/addProduct");
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
const cartRoute = require("./routes/cartRoute");
const addItemsRoute = require("./routes/addProductRoute");
const orderRoute = require("./routes/orderroute");
const { khalti, khaltiCallback } = require("./khalti");
const workersRouters = require("./routes/workersRouters");
const verifyPaymentRoute = require("./routes/verifyPaymentRoute.js");

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/cart", cartRoute);
app.use("/addProduct", addItemsRoute);
app.use("/uploads", express.static("uploads"));
app.use("/api/orderSchedule", orderRoute);
app.use("/api/khalti/init", khalti);
// app.use("/api/khalti/init/verify", khaltiCallback);
app.use("/api/workers", workersRouters);

app.use("/api/khaltiVerify", verifyPaymentRoute);

app.listen(port, () => {
  console.log(`Server Started At ${port}`);
});
