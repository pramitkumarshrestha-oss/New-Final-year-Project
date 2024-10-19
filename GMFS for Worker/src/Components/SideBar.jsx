// src/Components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css"; // Import the CSS module

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>Worker Dashboard</h2>
      <ul>
        <li>
          <Link to="/tasks">Task List</Link>
        </li>
        <li>
          <Link to="/shifts">Shift Schedule</Link>
        </li>{" "}
        {/* Corrected the path */}
        <li>
          <Link to="/messages">Messages</Link>
        </li>
        <li>
          <Link to="/performance">Performance Metrics</Link>
        </li>
        <li>
          <Link to="/payments">Payment History</Link>
        </li>
        <li>
          <Link to="/notifications">Notifications</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
