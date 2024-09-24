import { useState } from "react";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import styles from "../Styles/Login.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [error, setError] = useState({});

  // Form validation
  const validate = () => {
    let formErrors = {};
    if (!formData.userName.trim()) {
      formErrors.userName = "Username is required *";
    } else if (!/[A-Za-z]+[A-Za-z]*/.test(formData.userName)) {
      formErrors.userName = "Invalid Username";
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
        "Must include an uppercase, lowercase, digit, and symbol";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (Object.keys(validationError).length > 0) {
      setError(validationError);
    } else {
      const result = await axios.post("http://localhost:3010/login", formData);
      setFormData({
        userName: "",
        password: "",
      });
      console.log("Successfully submitted");
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

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.login_container}>
          {/* Left container */}
          <div className={styles.left_container}>
            {/* <div className={styles.overlay}></div> */}
            {/* <div className={styles.text_overlay}></div> */}
          </div>

          {/* Right container */}
          <div className={styles.right_container}>
            <div className={styles.inner_right}>
              <h1>WELCOME</h1>
              <p className={styles.sub_head}>Login To Your Account</p>

              <div className={styles.input_details}>
                <form onSubmit={handleSubmit} noValidate>
                  {/* Username */}
                  <div className={styles.form_group}>
                    <div className={styles.input_icon_wrapper}>
                      <label
                        htmlFor="login_username"
                        className={styles.floating_label}
                      >
                        Username:
                      </label>
                      <FaUserCircle className={styles.input_icon} />
                      <input
                        type="text"
                        id="login_username"
                        className={styles.input_field}
                        placeholder="Enter Your Username"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {error.userName && (
                      <p className={styles.input_error}>{error.userName}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className={styles.form_group}>
                    <div className={styles.input_icon_wrapper}>
                      <label
                        htmlFor="login_password"
                        className={styles.floating_label}
                      >
                        Password:
                      </label>
                      <RiLockPasswordFill className={styles.input_icon} />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="login_password"
                        className={styles.input_field}
                        placeholder="Enter Your Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
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
                      {/* Login Button */}
                      <div className={styles.login_btn}>
                        <button type="submit" className={styles.submit_button}>
                          Login
                        </button>
                      </div>
                    </div>
                    {error.password && (
                      <p className={styles.input_error}>{error.password}</p>
                    )}
                    <p className={styles.forgot_password}>
                      Forgot your password?
                    </p>
                  </div>
                </form>

                {/* Signup Link */}

                <p className={styles.haveAccount}>
                  Don{`'`}t have an account? <br></br>
                  <Link to="/signup">Sign Up Now</Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
