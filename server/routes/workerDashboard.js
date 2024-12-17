const express = require("express");
const router = express.Router();
const workerDashboard = require("../controls/workerDashboard");

router.get("/", workerDashboard);

module.exports = router;
