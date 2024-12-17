const express = require("express");
const router = express.Router();
const adminDashboard = require("../controls/adminDashboard");

router.get("/", adminDashboard);

module.exports = router;
