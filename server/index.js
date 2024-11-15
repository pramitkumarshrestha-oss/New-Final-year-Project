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
const productDetials = require("./models/addProduct");

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
app.use("/api/khalti/init/verify", khaltiCallback);
app.use("/api/workers", workersRouters);

app.listen(port, () => {
  console.log(`Server Started At ${port}`);
});
