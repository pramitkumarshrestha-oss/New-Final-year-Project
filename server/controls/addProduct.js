const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const productDetials = require("../models/addProduct");
const addProduct = async (res, req) => {
  try {
    await newItem.save();
    res.status(201).send("Food item added successfully");
  } catch (error) {
    res.status(500).send("Error saving item to database");
  }
};
module.exports = { addProduct };
