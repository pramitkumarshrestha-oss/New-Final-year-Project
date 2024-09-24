const express = require("express");
const user = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const loginpage = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const result = await user.findOne({ userName: userName });
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
        // const token = jwt.sign({ userName }, process.env.JWT_SECRET, {
        //   expiresIn: "1h",
        // });
        console.log("Login Successful");
        res /*.status(200)*/
          .send("Login Successful");
      } else {
        console.log("Incorrect Password");
        res.status(400).send("incorrect password");
      }
    } else {
      console.log("User doesnt exist");
      res.status(401).send("user doesnt exist please register first");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = loginpage;
