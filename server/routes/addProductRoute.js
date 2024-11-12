const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
const router = express.Router();
const addProduct = require("../controls/addProduct");
router.post("/", upload.none(), addProduct.addProduct);
module.exports = router;
