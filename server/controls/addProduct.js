const express = require("express");
const multer = require("multer");
const productDetials = require("../models/addProduct");
require("dotenv").config();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  console.log(req.body);

  const { name, description, price, category } = req.body;
  const imagePath = req.file ? req.file.path : null;
  // console.log(name);
  if (!name || !description || !price || !category) {
    return res.status(400).send("Missing required fields");
  } else if (!imagePath) {
    return res.status(400).send("No file uploaded");
  } else {
    try {
      const newItem = new productDetials({
        image: imagePath,
        name: name,
        description: description,
        category: category,
        price: price,
        standardTime: 0,
        minTime:0 
      });

      await newItem.save();
      res.status(201).send("Fiber item added successfully");
      console.log("Product Added");
    } catch (error) {
      res.status(500).send("Error saving item to database");
    }
  }
};

module.exports = { upload, addProduct };
