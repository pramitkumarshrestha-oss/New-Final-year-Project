const express = require("express");
const router = express.Router();
const Workerloginpage = require("../controls/workerLogin");
router.post("/", Workerloginpage);

module.exports = router;
