const express = require("express");
const workersModel = require("../models/workersModel");
const bcrypt = require("bcrypt");
const addWorker = async (req, res) => {
  console.log(req.body);
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
  async function workerValidation(
    name,
    phoneNumber,
    address,
    username,
    password,
    gender,
    age,
    citizenshipNumber
  ) {
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
      return res.status(400).send("Missing Required Filds");
    } else if (!/^[A-Za-z][A-Za-z0-9]*\s?[A-Za-z0-9]*$/.test(username)) {
      console.log(
        "userName must start with an alphabet and may include numbers and an optional space."
      );
      res
        .status(400)
        .send(
          "userName must start with an alphabet and may include numbers and an optional space."
        );
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\W_]).{8,}$/.test(password)
    ) {
      console.log("Use atleast a uppercase lowercase a digit and a symbol");
      res.send("Use atleast a uppercase lowercase a digit and a symbol");
    }
    return true;
  }
  console.log("sandesh");
  const checked = await workerValidation(
    name,
    phoneNumber,
    address,
    username,
    password,
    gender,
    age,
    citizenshipNumber
  );
  if (checked) {
    let checkUsername = await workersModel.findOne({ username: username });
    if (checkUsername) {
      console.log("UserName Of Worker Already Exist");
      res.send("UserName Of Worker Already Exist");
    }
  } else {
    const hashPassword = async (password) => {
      const saltRounds = Number(process.env.SALT);
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
      } catch (err) {
        console.error("Error hashing password:", err);
      }
    };
    try {
      const newWorker = new workersModel({
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        username: username,
        password: await hashPassword(password),
        gender: gender,
        age: age,
        citizenshipNumber: citizenshipNumber,
      });
      newWorker.save();
      console.log("Worker Registered Successfully");
      res.status(200).send("Worker Registered Successfully");
    } catch (error) {
      res.send(error);
    }
  }
};
module.exports = addWorker;
