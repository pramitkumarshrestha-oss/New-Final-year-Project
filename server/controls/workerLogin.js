const express = require("express");
const workersModel = require("../models/workersModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Workerloginpage = async (req, res) => {
  const secretKey = process.env.JWT_SECRET;
  const { username, password } = req.body;
  try {
    const result = await workersModel.findOne({ username: username });
    if (result) {
      const comparePasswords = async (password, result) => {
        try {
          const match = await bcrypt.compare(password, result);
          return match; // returns true if passwords match
        } catch (err) {
          console.error("Error comparing passwords:", err);
        }
      };
      const matched = await comparePasswords(password, result.password);
      if (matched) {
        const token = jwt.sign(
          { workerId: result.id, username: username },
          secretKey,
          { expiresIn: "24h" }
        );
        console.log("Login Successful");
        res.status(200).json({ message: "login sucessfully", token: token });
      } else {
        console.log("Incorrect Password");
        res.json({ message: "incorrect password" });
      }
    } else {
      console.log("User doesnt exist");
      res.send("user doesnt exist please register first");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = Workerloginpage;
