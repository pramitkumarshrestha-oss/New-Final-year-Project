const express = require("express");
const router = express.Router();
const workerDashboard = require("../controls/workerDashboard");
const jwtToken = require("../middleWare/jwtToken");

router.get("/", jwtToken, workerDashboard);

module.exports = router;
