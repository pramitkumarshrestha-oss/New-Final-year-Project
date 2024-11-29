const express = require("express");
const router = express.Router();
const workerList = require("../controls/workersList");
router.get("/workersList", workerList);
module.exports = router;
