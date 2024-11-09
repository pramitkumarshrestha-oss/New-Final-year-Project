import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove authentication status from localStorage
    localStorage.removeItem("isAuthenticated");

    // Redirect to login page after logout
    navigate("/workerlogin");
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>You have been logged out</h2>
      <p>Redirecting to login page...</p>
    </div>
  );
};

export default Logout;
