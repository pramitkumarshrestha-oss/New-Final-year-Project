import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@mui/material/Button";
import axios from "axios";

const WorkerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    joinedDate: null,
    address: "",
    phoneNumber: "",
    username: "",
    password: "",
    citizenshipNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, joinedDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("age", formData.age);
    data.append("gender", formData.gender);
    data.append("joinedDate", formData.joinedDate);
    data.append("address", formData.address);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("citizenshipNumber", formData.citizenshipNumber);
    for (let [key, value] of data.entries()) {
      console.log(`Key: ${key}, Value: ${value}`);
    }

    // console.log("Form Data Submitted: ", formData);
    try {
      const result = await axios.post("http://localhost:3010/addworker", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
      setFormData({
        name: "",
        age: "",
        gender: "",
        joinedDate: null,
        address: "",
        phoneNumber: "",
        username: "",
        password: "",
        citizenshipNumber: "",
      });
      // console.log(setFormData);
    } catch (error) {
      console.log("Error Adding Worker", error);
    }
    // You can add your submit logic here
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Add a Worker</h5>
        </div>

        <form className="form">
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
                        required
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>AGE</h6>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                      />
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
                          onChange={handleChange}
                          required
                        />{" "}
                        Female
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          onChange={handleChange}
                          required
                        />{" "}
                        Male
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="Other"
                          onChange={handleChange}
                          required
                        />{" "}
                        Other
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>JOINED DATE </h6>
                      <DatePicker
                        selected={formData.joinedDate}
                        onChange={handleDateChange}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="mm/dd/yyyy"
                        required
                      />
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
                        required
                      />
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
                        required
                      />
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
                        required
                      />
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
                        required
                      />
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
                        required
                      />
                    </div>
                  </div>
                </div>

                <Button
                  className="btn-blue btn-lg btn-big w-100"
                  onClick={handleSubmit}
                >
                  ADD WORKER
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default WorkerForm;
