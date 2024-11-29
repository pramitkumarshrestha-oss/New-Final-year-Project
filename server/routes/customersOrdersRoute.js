const express = require("express");
const router = express.Router();
const customersOrder = require("../controls/customersOrders");
const jwtToken = require("../middleWare/jwtToken");

router.get("/customersOrder", jwtToken, customersOrder);

module.exports = router;
