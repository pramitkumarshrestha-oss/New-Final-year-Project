const express = require("express");
const router = express.Router();
const getAllAssignedOrdersHandler = require("../controls/fetchWorks");
router.get("/", getAllAssignedOrdersHandler);
module.exports = router;
