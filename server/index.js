const express = require("express");
const router = express.Router();
const cors = require("cors");
// const mongoose = require("mongoose");
const productDetials = require("./models/addProduct");
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
const { khalti } = require("./khalti");
const workersRouters = require("./routes/workerControllerRoute.js");
const addWorker = require("./routes/addWorkerRoute.js");
const verifyPaymentRoute = require("./routes/verifyPaymentRoute.js");
const listOrders = require("./routes/listOrders.js");
const listWorkers = require("./routes/listWorkers.js");
const customersOrder = require("./routes/customersOrdersRoute.js");
const workerLoginRoute = require("./routes/workerLoginRoute.js");
const editProduct = require("./routes/editProductRoute.js");
const editWorker = require("./routes/editWorkerRoute.js");
const fetchProduct = require("./routes/fetchProductRoute.js");
const fetchWorks = require("./routes/fetchWorksRoute.js");
const updateOrder = require("./routes/orderUpdateRoute.js");
const adminDashboard = require("./routes/adminDashboardRoute.js");
const workerDashboard = require("./routes/workerDashboard.js");
const cashOnDelivery = require("./routes/cashOnDelivery.js");
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/cart", cartRoute);
app.use("/addProduct", addItemsRoute);
app.use("/uploads", express.static("uploads"));
app.get("/addProducts", async (req, res) => {
  try {
    const fetchProduct = await productDetials.find();
    res.status(200).send(fetchProduct);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch products" });
  }
});
app.use("/api/orderSchedule", orderRoute);
app.use("/api/khalti/init", khalti);
app.use("/api/workers", workersRouters);
app.use("/addworker", addWorker);
app.use("/api/khaltiVerify", verifyPaymentRoute);
app.get("/list", listOrders);
app.get("/workersList", listWorkers);
app.use("/customersOrder", customersOrder);
app.use("/workerLoginPage", workerLoginRoute);
app.use("/editProduct", editProduct);
app.use("/editWorker", editWorker);
app.use("/fetchProduct", fetchProduct);
app.use("/fetchWorks", fetchWorks);
app.use("/api/updateOrder", updateOrder);
app.use("/api/adminDashboard", adminDashboard);
app.use("/api/workerDashboard", workerDashboard);
app.use("/api/cod", cashOnDelivery);

app.listen(port, () => {
  console.log(`Server Started At ${port}`);
});
