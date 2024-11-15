const express = require("express");
const router = express.Router();
const verifyPayment = require("../controls/verifyPayment");
const jwtToken = require("../middleWare/jwtToken");

router.post("/", jwtToken, verifyPayment);

module.exports = router;
