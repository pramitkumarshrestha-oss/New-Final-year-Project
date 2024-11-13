import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegImages } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component"; // Ensure LazyLoadImage is imported
import axios from "axios";
const ProductUplaod = () => {
  const [image, setImage] = useState(false);
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
    console.log(data);
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
  
    try {
      const result = await axios.post("http://localhost:3010/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
  
      console.log(result);
      setData({
        name: "",
        description: "",
        price: "",
        category: "",
      });
      setImage(null);
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <>
      <div className="right-content w-100">
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
                        <MenuItem value="">
                          <em value={null}>None</em>
                        </MenuItem>
                        <MenuItem className="text-capitalize" value="Silk">
                          Silk
                        </MenuItem>

                        <MenuItem className="text-capitalize" value="Cotton">
                          Cotton
                        </MenuItem>

                        <MenuItem className="text-capitalize" value="Organza">
                          Organza
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

                {/* <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>DISCOUNT PRICE</h6>
                      <input type="text" name="" />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>PRODUCT STOCK </h6>
                      <input type="text" />
                    </div>
                  </div>
                </div> */}
                <div className="card p-4 mt-0">
                  <div className="imagesUploadSec">
                    <h5 class="mb-4">Media and Published</h5>
                    <div className="imgUploadBox d-flex align-items-center">
                      <div className="uploadBox">
                        <span className="remove">
                          <IoCloseSharp />
                        </span>
                        <div className="box">
                          <LazyLoadImage
                            alt={"image"}
                            effect="blur"
                            className="w-100"
                            src={
                              "https://i.pinimg.com/564x/2b/ec/03/2bec0331de9130115c0fe5d2d2760212.jpg"
                            }
                          />
                        </div>
                      </div>

                      <div className="uploadBox">
                        <input type="file" multiplename="images" />
                        <div className="info">
                          <FaRegImages />
                          <h5>image upload</h5>
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
                  <FaCloudUploadAlt /> &nbsp; PUBLISH AND VIEW
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
