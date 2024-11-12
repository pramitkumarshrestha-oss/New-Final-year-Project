const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const productDetials = require("../models/addProduct");
require("dotenv").config();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage: storage });

const addProduct = async (res, req) => {
  console.log(req.body);
  const { name, description, price, category } = req.body;
  const imagePath = req.file.path;
  if (!name || !description || !price || !category) {
    return res.status(400).send("Missing required fields");
  } else if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  try {
    const newItem = new productDetials({
      image: imagePath,
      productName: name,
      productDescription: description,
      productCategory: category,
      productPrice: price,
    });
    await newItem.save();
    res.status(201).send("Food item added successfully");
    console.log("Product Added");
  } catch (error) {
    res.status(500).send("Error saving item to database");
  }
};
module.exports = { addProduct };
