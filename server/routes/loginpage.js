const express = require("express");
const router = express.Router();
const loginpage = require("../controls/login");
router.post("/", loginpage);

module.exports = router;
