const express = require("express");
const router = express.Router();
const signuppage = require("../controls/signup");
router.post("/", signuppage);

module.exports = router;
