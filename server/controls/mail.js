const nodemailer = require("nodemailer");
const workerModel = require("../models/workersModel");

async function sendEmail(email, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mrkazi2110@gmail.com",
      pass: "edmn elnj vwfb afon",
    },
  });
  const mailOptions = {
    from: "mrkazi2110@gmail.com",
    to: email,
    subject: "Work Assigned",
    text: text,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to", email);
    return true;
  } catch (error) {
    console.error("Error sending Email:", error);
    return false;
  }
}

module.exports = sendEmail;
