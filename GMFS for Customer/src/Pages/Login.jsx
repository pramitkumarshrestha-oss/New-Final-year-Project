import { useState } from "react";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import styles from "../Styles/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  // Validation function
  const validate = () => {
    let formErrors = {};
    if (!formData.userName.trim())
      formErrors.userName = "Username is required *";
    if (!formData.password.trim())
      formErrors.password = "Password is required *";
    return formErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (Object.keys(validationError).length > 0) {
      setError(validationError);
    } else {
      try {
        console.log("Ok");
        const result = await axios.post(
          "http://localhost:3010/login",
          formData
        );
        console.log(result.data);
        if (result.data.message === "login sucessfully") {
          toast.success(result.data.message);
          console.log("hello");
          const token = result.data.token;
          localStorage.setItem("token", token);
          setToken(token);
          console.log(token);

          login();
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else if (result.data.message === "incorrect password") {
          toast.error(result.data);
        } else if (result.data === "user doesnt exist please register first") {
          toast.error(result.data);
        }
      } catch (error) {
        console.log(error);
        // setMessage("error");
      }
    }
  };

  // Handle input changes
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
      <ToastContainer />
      <div className={styles.main_container}>
        <div className={styles.login_container}>
          {/* Left container */}
          <div className={styles.left_container}></div>

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
                        className={`${styles.input_field} ${
                          error.userName ? styles.error : ""
                        }`}
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
                        className={`${styles.input_field} ${
                          error.password ? styles.error : ""
                        }`}
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
                          aria-label="Hide password"
                        />
                      ) : (
                        <FaEyeSlash
                          className={styles.password_eye}
                          onClick={handleShowPassword}
                          aria-label="Show password"
                        />
                      )}
                    </div>
                    {error.password && (
                      <p className={styles.input_error}>{error.password}</p>
                    )}
                  </div>

                  {/* Login Button */}
                  <div className={styles.login_btn}>
                    <button type="submit" className={styles.submit_button}>
                      Login
                    </button>
                  </div>

                  <p className={styles.forgot_password}>
                    Forgot your password?
                  </p>
                </form>

                {/* Signup Link */}
                <p className={styles.haveAccount}>
                  Don’t have an account? <Link to="/signup">Sign Up Now</Link>
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
