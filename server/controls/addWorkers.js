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
      joinedDate, // Extracted from req.body
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

    // Age validation
    if (!age) {
      return res.status(400).json({ message: "Age is required." });
    }
    if (isNaN(age)) {
      return res.status(400).json({ message: "Age must be a valid number." });
    }
    if (age < 16 || age > 65) {
      return res
        .status(400)
        .json({ message: "Worker age must be between 16 and 65." });
    }

    // Citizenship number validation
    if (!/^[A-Z0-9]{5,15}$/.test(citizenshipNumber)) {
      return res.status(400).json({
        message:
          "Citizenship number must be alphanumeric and between 5-15 characters.",
      });
    }

    // Check if username or citizenship number already exists
    const existingWorker = await workersModel.findOne({
      $or: [{ username }, { citizenshipNumber }],
    });
    if (existingWorker) {
      if (existingWorker.username === username) {
        return res.status(400).json({ message: "Username already exists." });
      }
      if (existingWorker.citizenshipNumber === citizenshipNumber) {
        return res
          .status(400)
          .json({ message: "Citizenship number already exists." });
      }
    }

    // Hash password
    const saltRounds = Number(process.env.SALT) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Validate joinedDate
    let validatedJoinedDate = joinedDate;
    if (joinedDate) {
      // Ensure it is a valid date
      const parsedDate = new Date(joinedDate);
      if (isNaN(parsedDate)) {
        return res.status(400).json({ message: "Invalid joined date." });
      }
      validatedJoinedDate = parsedDate; // Convert to Date object if valid
    } else {
      // If not provided, set it to the current date
      validatedJoinedDate = new Date();
    }

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
      joinedDate: validatedJoinedDate,
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
