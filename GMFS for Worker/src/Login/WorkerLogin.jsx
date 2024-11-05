import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"; // Import CSS module

const WorkerLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Placeholder for actual authentication logic
    if (username === "worker" && password === "password123") {
      onLoginSuccess(); // Call the prop function to set authenticated state
      navigate("/dashboard"); // Redirect to WorkerHomePage on successful login
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className={styles.loginContainer}>
    <div className={styles.backgroundImage}></div>
      <div className={styles.loginCard}>
        <h2>Worker Login</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkerLogin;
