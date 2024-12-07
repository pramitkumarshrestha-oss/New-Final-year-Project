import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import axios from "axios";
import { useLocation } from "react-router-dom";

const EditProduct = () => {
  const location = useLocation();
  const { state } = location;

  const [formData, setFormData] = useState({
    name: state?.name,
    description: state?.description,
    price: state?.price,
    category: state?.category,
    id: state?._id,
  });

  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [error, setError] = useState(""); // Error state

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error

    if (!formData.id) {
      setError("Product ID is missing. Please refresh and try again.");
      return;
    }

    try {
      const result = await axios.post(
        "http://localhost:3010/editProduct/editProduct",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (result.status === 200) {
        setShowPopup(true); // Show popup on success
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
        });
      }
    } catch (err) {
      setError("Failed to update the product. Please try again.");
      console.error("Error uploading product:", err);
    }
  };

  return (
    <>
      <div className="right-content w-100">
        {/* Popup Section */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>Product Edited Successfully</h2>
              <button className="btn-close" onClick={() => setShowPopup(false)}>
                Close
              </button>
            </div>
          </div>
        )}

        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Edit Product</h5>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="form" onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="col-sm-12">
              <div className="card p-4">
                <h5>Basic Information</h5>

                <div className="form-group">
                  <h6>Product Name</h6>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleOnChange}
                    required
                    placeholder="Enter product name"
                  />
                </div>

                <div className="form-group">
                  <h6>Description</h6>
                  <textarea
                    rows={5}
                    cols={10}
                    name="description"
                    value={formData.description}
                    onChange={handleOnChange}
                    required
                    placeholder="Enter product description"
                  />
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>Category</h6>
                      <Select
                        value={formData.category}
                        name="category"
                        onChange={handleOnChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                        required
                      >
                        <MenuItem value="" disabled>
                          Select Category
                        </MenuItem>
                        <MenuItem value="Silk">Silk</MenuItem>
                        <MenuItem value="Cotton">Cotton</MenuItem>
                        <MenuItem value="Chiffon">Chiffon</MenuItem>
                      </Select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>Price</h6>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleOnChange}
                        required
                        placeholder="Enter product price"
                      />
                    </div>
                  </div>
                </div>

                <br />
                <Button className="btn-blue btn-lg btn-big w-100" type="submit">
                  Save Edited Product
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
