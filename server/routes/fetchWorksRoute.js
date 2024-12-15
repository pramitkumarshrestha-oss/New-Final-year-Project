const express = require("express");
const router = express.Router();
const getAllWorkersWithOrdersHandler = require("../controls/fetchWorks");
const jwtToken = require("../middleWare/jwtToken");
router.get("/",jwtToken,getAllWorkersWithOrdersHandler);
module.exports = router;
