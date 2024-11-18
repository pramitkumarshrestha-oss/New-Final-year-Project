import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"; // Import CSS module

const WorkerLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Both fields are required");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      // Placeholder for actual authentication logic
      if (username === "worker" && password === "password123") {
        onLoginSuccess(); // Call the prop function to set authenticated state
        navigate("/dashboard"); // Redirect to WorkerHomePage on successful login
      } else {
        setError("Invalid username or password*");
      }
      setLoading(false);
    }, 1500); // Simulate network delay
  };

  return (
    <div className={styles.workerLogin}>
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
