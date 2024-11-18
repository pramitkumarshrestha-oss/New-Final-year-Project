const express = require("express");
const router = express.Router();
const listOrders = require("../controls/adminOrderList");
router.get("/list", listOrders);
module.exports = router;
