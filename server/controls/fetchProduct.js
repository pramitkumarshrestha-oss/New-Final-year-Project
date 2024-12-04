const productDetials = require("../models/addProduct");
const getAllproducts = async (req, res) => {
  try {
    const products = await productDetials.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};
module.exports = getAllproducts;
