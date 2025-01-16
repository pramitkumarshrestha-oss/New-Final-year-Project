import * as React from "react";

import MenuItem from "@mui/material/MenuItem";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";

import { FaRegImages } from "react-icons/fa";

import axios from "axios";
const ProductUplaod = () => {
  const [image, setImage] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preVal) => ({
      ...preVal,
      [name]: value,
    }));
    // console.log(data);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);

    for (let [key, value] of formData.entries()) {
      console.log(`Key: ${key}, Value: ${value}`);
    }
    // console.log(formData);

    try {
      const result = await axios.post(
        "http://localhost:3010/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(result);
      setData({
        name: "",
        description: "",
        price: "",
        category: "",
      });
      setImage(null);
      setShowPopup(true); // Show popup on success
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <>
      <div className="right-content w-100">
        {/* Popup Section */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>Product Uploaded Successfully</h2>
              <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        )}

        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Product Upload</h5>
        </div>

        <form className="form">
          <div className="row">
            <div className="col-sm-12">
              <div className="card p-4">
                <h5>Basic Information</h5>

                <div className="form-group">
                  <h6>PRODUCT NAME</h6>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                  />
                </div>

                <div className="form-group">
                  <h6>DESCRIPTION</h6>
                  <textarea
                    rows={5}
                    cols={10}
                    name="description"
                    value={data.description}
                    onChange={handleOnChange}
                  />
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>CATEGORY</h6>
                      <Select
                        value={data.category}
                        name="category"
                        onChange={handleOnChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem className="text-capitalize" value="Shirt">
                          Shirt
                        </MenuItem>

                        <MenuItem className="text-capitalize" value="Pant">
                          Pant
                        </MenuItem>

                        <MenuItem className="text-capitalize" value="Coat">
                          Coat
                        </MenuItem>

                        <MenuItem className="text-capitalize" value="Jacket">
                          Jacket
                        </MenuItem>

                        <MenuItem className="text-capitalize" value="Hoodie">
                          Hoodie
                        </MenuItem>

                        <MenuItem className="text-capitalize" value="Random">
                          Random
                        </MenuItem>
                      </Select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>PRICE</h6>
                      <input
                        type="text"
                        name="price"
                        value={data.price}
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="card p-4 mt-0">
                  <div className="imagesUploadSec">
                    <h5 class="mb-4">Adding Product</h5>
                    <div className="imgUploadBox d-flex align-items-center">
                      <div className="uploadBox">
                        <label htmlFor="image">
                          <img
                            src={image ? URL.createObjectURL(image) : ""}
                            alt=""
                          />
                        </label>

                        <input
                          type="file"
                          multiplename="images"
                          name="image"
                          onChange={(e) => setImage(e.target.files[0])}
                          required
                        />
                        <div className="info">
                          <FaRegImages />
                          <h5>Product image upload</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <Button
                  className="btn-blue btn-lg btn-big w-100"
                  onClick={handleFormSubmit}
                >
                  &nbsp; PUBLISH AND VIEW
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default ProductUplaod;
