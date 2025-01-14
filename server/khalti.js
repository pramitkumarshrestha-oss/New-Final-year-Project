const axios = require("axios");
require("dotenv").config();
// const order=require("./models/orderModel");

const khalti = async (req, res) => {
  try {
    const headers = {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    };
    const { amount, purchase_order_id, purchase_order_name, customer_info } =
      req.body;
    const formData = {
      return_url: "http://localhost:5173/paymentsuccess",
      website_url: "http://localhost:5173",
      amount: amount,
      purchase_order_id: purchase_order_id,
      purchase_order_name: purchase_order_name,
      customer_info: customer_info,
    };

    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      formData,
      {
        headers,
      }
    );

    // console.log(response.data);
    // console.log(response.data.payment_url);
    // console.log(response.data);
    if (response.data) {
      res.json({
        message: "khalti success",
        payment_method: "khalti",
        data: response.data,
      });
    } else {
      res.json({
        message: "khalti unsuccess",
        payment_method: "khalti",
        data: "",
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = { khalti };
