import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useLocation } from "react-router-dom";
const EditWorker = () => {
  const location = useLocation();
  const { state } = location;

  const [formData, setFormData] = useState({
    name: state?.name,
    age: state?.age,
    gender: state?.gender,
    joinedDate: state?.joinedDate,
    address: state?.address,
    phoneNumber: state?.phoneNumber,
    username: state?.username,
    password: state?.password,
    citizenshipNumber: state?.citizenshipNumber,
    id: state?._id,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setSuccessMessage(""); // Clear success message when making changes
  };

  // const handleDateChange = (date) => {
  //   setFormData({ ...formData, joinedDate: date });
  //   setErrors({ ...errors, joinedDate: "" });
  //   setSuccessMessage(""); // Clear success message when making changes
  // };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Username is required *";
    } else if (!/^[a-zA-Z][a-zA-Z0-9]{2,15}$/.test(formData.name)) {
      newErrors.name = "Invalid UserName";
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = "Age is required.";
    } else if (isNaN(formData.age)) {
      newErrors.age = "Age must be a valid number.";
    } else if (formData.age < 16 || formData.age > 65) {
      newErrors.age = "Age must be between 16 and 65.";
    }

    // Gender validation
    if (!formData.gender) newErrors.gender = "Please select a gender.";

    // Joined date validation
    if (!formData.joinedDate) newErrors.joinedDate = "Joined date is required.";

    // Address validation
    if (!formData.address) newErrors.address = "Address is required.";

    // Phone number validation
    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required *";
    } else if (!/^(98|97|96)[0-9]{8}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone Number";
    }

    // Username validation
    if (!formData.username) newErrors.username = "Username is required.";
    else if (!/^[A-Za-z][A-Za-z0-9]*$/.test(formData.username))
      newErrors.username =
        "Username must start with a letter and contain only letters and numbers.";

    // Password validation
    if (!formData.password) newErrors.password = "Password is required.";
    else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
        formData.password
      )
    )
      newErrors.password =
        "Password must include uppercase, lowercase, a number, and a special character.";

    // Citizenship number validation
    if (!formData.citizenshipNumber)
      newErrors.citizenshipNumber = "Citizenship number is required.";
    else if (!/^[A-Z0-9]{5,15}$/.test(formData.citizenshipNumber))
      newErrors.citizenshipNumber =
        "Citizenship number must be alphanumeric (5-15 characters).";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (!validateForm()) return;

    // const data = {
    //   ...formData,
    //   // joinedDate: formData.joinedDate
    //   //   ? formData.joinedDate.toISOString().split("T")[0]
    //   //   : null,
    // };

    try {
      const result = await axios.post(
        "http://localhost:3010/editWorker/editWorker",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Clear the form and set the success message
      setFormData({
        name: "",
        age: "",
        gender: "",
        joinedDate: "",
        address: "",
        phoneNumber: "",
        username: "",
        password: "",
        citizenshipNumber: "",
      });
      setErrors({});
      setSuccessMessage(result.data || "Worker updated successfully");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ form: error.response.data });
      } else {
        console.error("Error Adding Worker:", error);
      }
      setSuccessMessage("");
    }
  };

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4">
        <h5 className="mb-0">Edit a Worker</h5>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-12">
            <div className="card p-4">
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>NAME</h6>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>AGE</h6>
                    <input
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      min="16"
                      max="65"
                    />

                    {errors.age && <p className="error-text">{errors.age}</p>}
                  </div>
                </div>
                <div className="col">
                  <div className="form-gender">
                    <h6>GENDER</h6>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        // checked={state.gender === "Female"}
                        onChange={handleChange}
                      />{" "}
                      Female
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        // checked={state.gender === "Male"}
                        onChange={handleChange}
                      />{" "}
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Other"
                        // checked={state.gender === "Other"}
                        onChange={handleChange}
                      />{" "}
                      Other
                    </label>
                    {errors.gender && (
                      <p className="error-text">{errors.gender}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>JOINED DATE </h6>
                    <DatePicker
                      selected={formData.joinedDate}
                      // onChange={handleDateChange}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                    />
                    {errors.joinedDate && (
                      <p className="error-text">{errors.joinedDate}</p>
                    )}
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>ADDRESS</h6>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                    {errors.address && (
                      <p className="error-text">{errors.address}</p>
                    )}
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>PHONE NUMBER</h6>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                    {errors.phoneNumber && (
                      <p className="error-text">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>USERNAME </h6>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    {errors.username && (
                      <p className="error-text">{errors.username}</p>
                    )}
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>PASSWORD</h6>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      readOnly
                    />
                    {errors.password && (
                      <p className="error-text">{errors.password}</p>
                    )}
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>CITIZENSHIP NUMBER</h6>
                    <input
                      type="text"
                      name="citizenshipNumber"
                      value={formData.citizenshipNumber}
                      onChange={handleChange}
                    />
                    {errors.citizenshipNumber && (
                      <p className="error-text">{errors.citizenshipNumber}</p>
                    )}
                  </div>
                </div>
              </div>
              {errors.form && (
                <p className="error-text">
                  {errors.form.message || errors.form}
                </p>
              )}
              {successMessage && (
                <p className="success-text">
                  {successMessage.message || successMessage}
                </p>
              )}

              <Button className="btn-blue btn-lg btn-big w-100" type="submit">
                SAVE WORKER
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditWorker;
