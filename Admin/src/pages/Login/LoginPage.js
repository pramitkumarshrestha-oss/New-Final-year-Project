import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css"; // Importing styles from a CSS module

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple authentication check (replace with real API calls)
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isLoggedIn", "true"); // Store login status
      setIsAuthenticated(true);
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } else {
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <FaUser className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <FaLock className={styles.inputIcon} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.loginBtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
