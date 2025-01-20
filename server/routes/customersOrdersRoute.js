const express = require("express");
const router = express.Router();
const { customersOrder, userProfile } = require("../controls/customersOrders");
const jwtToken = require("../middleWare/jwtToken");

router.get("/customersOrder", jwtToken, customersOrder);
router.get("/userProfile", jwtToken, userProfile);

module.exports = router;
