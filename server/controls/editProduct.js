const addProduct = require("../models/addProduct");
const editProduct = async (req, res) => {
  const { name, description, price, category, id } = req.body;
  try {
    const updatedProduct = await addProduct.findByIdAndUpdate(id, {
      $set: {
        productname: name,
        productdescription: description,
        productcategory: category,
        productprice: price,
      },
    });
    if (updatedProduct) {
      console.log("Product updated successfully");
      res.status(200).json({ message: "Product updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.parms;
  try {
    const deletedProduct = await addProduct.findByIdAndDelete(id);
    if (deletedProduct) {
      res.status(200).json({ message: "Product deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

module.exports = { editProduct, deleteProduct };
