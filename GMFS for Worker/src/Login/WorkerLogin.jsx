import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"; // Import CSS module
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const WorkerLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //Validation ko lagi
  
  const validateForm = () => {
    // Username Validation
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/; // Starts with a letter and contains only letters and numbers
    if (!username) {
      setError("Username is required");
      return false;
    }
    if (!usernameRegex.test(username)) {
      setError("Username must start with a letter and contain only letters and numbers.");
      return false;
    }
  
    // Password Validation
    if (!password) {
      setError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
  
    setError(""); // Clear any previous errors
    return true;
  };
  



  const handleLogin = async (e) => {
    e.preventDefault();

      // Form validation
      if (!validateForm()) return;

    try {
        setLoading(true);
        const result = await axios.post(
          "http://localhost:3010/workerLoginPage",
         {
          username,password
         }
        ); 
        
        console.log(result.data);
        
   
        if (result.data.message === "login sucessfully") {
        
          toast.success(result.data.message);
          
          onLoginSuccess();
          // navigate("/dashboard");
      
          const workerToken = result.data.token;
          localStorage.setItem("workerToken", workerToken);
          console.log(localStorage.getItem("workerToken"));
          navigate("/dashboard");
          // setToken(needToken);
        

        
        } else if (result.data === "incorrect password") {
          toast.error(result.data);
        } else if (
          result.data === "user doesnt exist please register first"
        ) {
          toast.error(result.data);
          
        } else {
          toast.error(result.data || "Login failed");
        }
      } catch (error) {
        console.log(error); // Log the error for debugging
        toast.error("An error occurred. Please try again.");
      }

      finally {
        setLoading(false); // Stop loading spinner
      }
    }
  

  return (
    <div className={styles.workerLogin}>
    <ToastContainer />
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h2>Worker Login</h2>
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={styles.input}
                placeholder="Enter your username"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Password:</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.input}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "🙉" : "🙈"}
                </button>
              </div>
            </div>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <button
              type="submit"
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? <span className={styles.spinner}></span> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkerLogin;
