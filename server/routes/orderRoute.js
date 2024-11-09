const express = require("express");
const orderSchedule = require("../controls/orderControllers");
const jwtToken = require("../middleWare/jwtToken");
const router = express.Router();
router.post("/", verifyToken, orderSchedule);
