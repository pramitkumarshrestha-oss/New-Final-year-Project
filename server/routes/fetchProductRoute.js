const express = require("express");
const router = express.Router();
const getAllproducts = require("../controls/fetchProduct");
router.get("/fetchProduct", getAllproducts);
module.exports = router;
