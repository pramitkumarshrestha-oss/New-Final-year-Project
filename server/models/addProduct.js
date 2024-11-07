const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  image: { type: String },
  name: { type: String },
  description: { type: String },
  category: { type: String },
  price: { type: Number },
});
const productDetials = mongoose.model("productDetilas", productSchema);
module.exports = productDetials;
