import React, { useState } from "react";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaUserCircle,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Styles/Signup.module.css"; // Adjust the path as per your directory structure
import { useAuth } from "../Contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  // const { message, setMessage } = useAuth();
  const navigate = useNavigate();

  //user details
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Form validation function
  const validate = () => {
    let formErrors = {};
    if (!formData.userName.trim()) {
      formErrors.userName = "Username is required *";
    } else if (!/^[a-zA-Z][a-zA-Z0-9]{2,15}$/.test(formData.userName)) {
      formErrors.userName = "Invalid UserName";
    }

    if (!formData.email.trim()) {
      formErrors.email = "Email is required *";
    } else if (
      !/^([A-Za-z0-9]+(?:[.#_][A-Za-z\d]+)*@[A-Za-z]+)(\.[A-Za-z]{2,3})$/.test(
        formData.email
      )
    ) {
      formErrors.email = "Incorrect email format ";
    }

    if (!formData.phoneNumber.trim()) {
      formErrors.phoneNumber = "Phone Number is required *";
    } else if (!/^(98|97|96)[0-9]{8}$/.test(formData.phoneNumber)) {
      formErrors.phoneNumber = "Invalid phone Number";
    }

    if (!formData.password.trim()) {
      formErrors.password = "Password is required *";
    } else if (formData.password.length < 8) {
      formErrors.password = "At least 8 characters";
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\W_]).{8,}$/.test(
        formData.password
      )
    ) {
      formErrors.password =
        "Use at least an uppercase, lowercase, digit, and a symbol";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      try {
        console.log("ok");
        const result = await axios.post(
          "http://localhost:3010/signup",
          formData
        );
        console.log(result.data);
        if (result.data === "user registered successfully") {
          toast.success(result.data);
          console.log(result.data);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else if (result.data === "user already exist") {
          console.log("hello");
          toast.error(result.data);
        } else if (result.data === "userName already exist") {
          console.log("hello");
          toast.error(result.data);
        }
      } catch (err) {
        if (err.status === 401) {
          toast.error(err.data);
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));

    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  // Handle show password toggle
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.main_container}>
      <ToastContainer />
      <div className={styles.signup_container}>
        {/* Left side with Garment Management System branding */}
        <div className={styles.left_container}>
          {/* <div className={styles.overlay}></div>
          <div className={styles.text_overlay}>
            <h1>Garment Management System</h1>
            <h3>Streamlining garment production, one step at a time.</h3>
          </div> */}
        </div>

        {/* Right side for signup form */}
        <div className={styles.right_container}>
          <div className={styles.inner_right}>
            <h1>WELCOME</h1>
            <p className={styles.sub_head}>Sign Up</p>
            <form onSubmit={handleSubmit} noValidate>
              {/* Username */}
              <div className={styles.form_group}>
                <div className={styles.input_icon_wrapper}>
                  <FaUserCircle className={styles.input_icon} />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className={styles.input_field}
                    required
                  />
                </div>
                {error.userName && (
                  <p className={styles.input_error}>{error.userName}</p>
                )}
              </div>

              {/* Email */}
              <div className={styles.form_group}>
                <div className={styles.input_icon_wrapper}>
                  <FaEnvelope className={styles.input_icon} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input_field}
                    required
                  />
                </div>
                {error.email && (
                  <p className={styles.input_error}>{error.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className={styles.form_group}>
                <div className={styles.input_icon_wrapper}>
                  <FaPhone className={styles.input_icon} />
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={styles.input_field}
                    required
                  />
                </div>
                {error.phoneNumber && (
                  <p className={styles.input_error}>{error.phoneNumber}</p>
                )}
              </div>

              {/* Password */}
              <div className={styles.form_group}>
                <div className={styles.input_icon_wrapper}>
                  <RiLockPasswordFill className={styles.input_icon} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.input_field}
                    required
                  />
                  {showPassword ? (
                    <FaEye
                      className={styles.password_eye}
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <FaEyeSlash
                      className={styles.password_eye}
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
                {error.password && (
                  <p className={styles.input_error}>{error.password}</p>
                )}
              </div>

              <button type="submit" className={styles.submit_button}>
                Sign Up
              </button>
            </form>
            <p className={styles.already_account}>
              Already have an account? <br></br>{" "}
              <Link to="/login">Login Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
