const express = require("express");
const bcrypt = require("bcrypt");
const workersModel = require("../models/workersModel");

const addWorker = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      address,
      username,
      password,
      gender,
      age,
      citizenshipNumber,
    } = req.body;

    // Input validation
    if (
      !name ||
      !phoneNumber ||
      !address ||
      !username ||
      !password ||
      !gender ||
      !age ||
      !citizenshipNumber
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!/^[A-Za-z][A-Za-z0-9]*\s?[A-Za-z0-9]*$/.test(username)) {
      return res.status(400).json({
        message:
          "Username must start with an alphabet and may include numbers and an optional space.",
      });
    }
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(password)) {
      return res.status(400).json({
        message:
          "Password must include uppercase, lowercase, number, and a symbol.",
      });
    }

    // Check if username already exists
    const existingWorker = await workersModel.findOne({ username });
    if (existingWorker) {
      return res
        .status(400)
        .json({ message: "Username for the worker already exists." });
    }

    // Hash password
    const saltRounds = Number(process.env.SALT) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new worker
    const newWorker = new workersModel({
      name,
      phoneNumber,
      address,
      username,
      password: hashedPassword,
      gender,
      age,
      citizenshipNumber,
    });

    await newWorker.save();
    res.status(200).json({ message: "Worker added successfully!" });
    console.log("Worker added successfully!");
  } catch (error) {
    console.error("Error adding worker:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = addWorker;
