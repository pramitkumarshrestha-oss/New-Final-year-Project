const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

const router = express.Router();
const addProduct = require("../controls/addProduct");

router.post("/", upload.single("image"), addProduct.addProduct);

module.exports = router;
