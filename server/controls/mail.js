const nodemailer = require("nodemailer");

const sendMail = async (workerEmail) => {
  try {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "solusandesh@gmail.com", // Your email
        pass: "iloveplaying@123", // Replace with an app password (not your email password)
      },
    });

    // Define email options
    const mailOptions = {
      from: "solusandesh@gmail.com", // Sender email
      to: workerEmail, // Receiver email
      subject: `Work Assignment Notification`,
      text: "New Work Has Been Assign To You",
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return { success: true, response: info.response };
  } catch (error) {
    console.error("Error while sending email:", error);
    return { success: false, error };
  }
};

module.exports = sendMail;
