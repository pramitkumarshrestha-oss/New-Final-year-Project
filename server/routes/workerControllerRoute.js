const express = require("express");
const router = express.Router();
const assginWorkerHandlerorker = require("../controls/workersController");
router.post("/", assginWorkerHandlerorker);

module.exports = router;
