const express = require("express");
const router = express.Router();
const orderUpdate = require("../controls/orderUpdate");

router.post("/", orderUpdate);

module.exports = router;
