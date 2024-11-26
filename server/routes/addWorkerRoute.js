const express = require("express");
const router = express.Router();
const addWorker = require("../controls/addWorkers");
router.post("/", addWorker);

module.exports = router;
