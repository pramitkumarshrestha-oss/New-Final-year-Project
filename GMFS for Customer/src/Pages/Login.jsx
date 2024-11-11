import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../Styles/Login.module.css"; // Update path if needed
import { useAuth } from "../Contexts/AuthContext";
import { StoreContext } from "../Contexts/StoreContext";

export const Login = () => {
  const { token, setToken } = useContext(StoreContext);
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    let formErrors = {};
    if (!formData.userName.trim())
      formErrors.userName = "Username is required *";
    if (!formData.password.trim())
      formErrors.password = "Password is required *";
    return formErrors;
  };

  // Handling Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (Object.keys(validationError).length > 0) {
      setError(validationError);
    } else {
      try {
        const result = await axios.post(
          "http://localhost:3010/login",
          formData
        ); // API for customer login
        // console.log(result.data);
        if (result.data.message === "login sucessfully") {
          // console.log("hello");
          toast.success(result.data.message);
          // console.log("hello");
          const needToken = result.data.token;
          localStorage.setItem("token", needToken);
          console.log(localStorage.getItem("token"));
          setToken(needToken);
          console.log(token);

          login();
          setTimeout(() => {
            navigate("/"); // Redirect to homepage after 2 seconds
          }, 2000);
        } else if (result.data.message === "incorrect password") {
          toast.error(result.data.message);
        } else if (
          result.data.message === "user doesnt exist please register first"
        ) {
          toast.error(result.data.message);
          localStorage.setItem("token", token); // Save token
          login(); // Call auth context's login function
          setTimeout(() => navigate("/home"), 2000); // Redirect to home page
        } else {
          toast.error(result.data.message || "Login failed");
        }
      } catch (error) {
        console.log(error); // Log the error for debugging
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevVal) => ({ ...prevVal, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  // Function to redirect to the Worker Login page running on port 5174
  const navigateToWorkerLogin = () => {
    const workerAppUrl = "http://localhost:5174/workerlogin"; // Point to the Worker app running on port 5174
    window.location.href = workerAppUrl;
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.main_container}>
        <div className={styles.login_container}>
          <div className={styles.left_container}></div>
          <div className={styles.right_container}>
            <div className={styles.inner_right}>
              <h1>WELCOME</h1>
              <p className={styles.sub_head}>Login To Your Account</p>

              <div className={styles.input_details}>
                <form onSubmit={handleSubmit} noValidate>
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

                  <div className={styles.login_btn}>
                    <button type="submit" className={styles.submit_button}>
                      Login
                    </button>
                  </div>

                  <p className={styles.forgot_password}>
                    Forgot your password?
                  </p>
                </form>

                <p className={styles.haveAccount}>
                  Don’t have an account? <Link to="/signup">Sign Up Now</Link>
                </p>

                <p className={styles.loginAsWorker}>
                  <button
                    onClick={navigateToWorkerLogin}
                    className={styles.workerButton}
                  >
                    Login as Worker
                  </button>
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
