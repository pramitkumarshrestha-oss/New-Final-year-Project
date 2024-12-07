const addProduct = require("../models/addProduct");
const editProduct = async (req, res) => {
  const { name, description, price, category, id } = req.body;
  try {
    const updatedProduct = await addProduct.findByIdAndUpdate(id, {
      $set: {
        name: name,
        description: description,
        category: category,
        price: price,
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
  const { id } = req.body;
  try {
    const deletedProduct = await addProduct.findByIdAndDelete(id);
    if (deletedProduct) {
      res.status(200).json({ message: "Product deleted successfully" });
      console.log(deleteProduct);
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

module.exports = { editProduct, deleteProduct };
