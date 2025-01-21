const express = require("express");
const cashOnDelivery = require("../controls/cashOnDelivery");
const jwtToken = require("../middleWare/jwtToken");
const router = express.Router();

router.post("/", jwtToken, cashOnDelivery);

module.exports = router;
