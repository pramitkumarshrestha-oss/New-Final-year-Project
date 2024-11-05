import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUserCog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa"; // Importing icons
import logo from "../assets/logofirst.png";
import styles from "./Sidebar.module.css";

const Sidebar = ({ onLogout }) => {
  return (
    <div className={styles.sidebar}>
      {/* Logo section */}
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>

      {/* Sidebar Navigation Links */}
      <ul className={styles.navList}>
        <li>
          <Link to="/dashboard">
            <FaTachometerAlt className={styles.icon} /> Dashboard
          </Link>
        </li>
     
        <li>
          <Link to="/help">
            <FaQuestionCircle className={styles.icon} /> Help/Support
          </Link>
        </li>

        <li>
          <Link to="/profile">
            <FaUserCog className={styles.icon} /> Profile Settings
          </Link>
        </li>
        
        <li>
        <Link to="/logout" onClick={onLogout}> {/* Call onLogout on click */}
            <FaSignOutAlt className={styles.icon} /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
