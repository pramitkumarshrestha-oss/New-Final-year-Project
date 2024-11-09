const express = require("express");
const router = express.Router();
const addProduct = require("../controls/addProduct");
router.post("/", addProduct.upload.single("image"), addProduct.addProduct);
module.exports = router;
