const express = require("express");
const router = express.Router();
const { editWorker, deleteWorker } = require("../controls/editWorker");
router.post("/editWorker", editWorker);
router.post("/deleteWorker", deleteWorker);
module.exports = router;
