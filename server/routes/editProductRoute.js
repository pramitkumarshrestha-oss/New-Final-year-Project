const express = require("express");
const router = express.Router();
const { editProduct, deleteProduct } = require("../controls/editProduct");
router.post("/editProduct", editProduct);
router.post("/deleteProduct", deleteProduct);
module.exports = router;
