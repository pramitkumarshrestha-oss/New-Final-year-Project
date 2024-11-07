import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";
import { useAuth } from "../Contexts/AuthContext";
import { useStore } from "../Contexts/StoreContext";
import logo from "../assets/image1/logofirst.png";

const Navbar = () => {
  const { cartItemCount } = useStore(); // Get cart item count
  const { isLoggedIn, logout } = useAuth(); // Get login status and logout function

  // State for dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.para}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/about" className={styles.link}>
          About Us
        </Link>
        <Link to="/products" className={styles.link}>
          Products
        </Link>
        <Link to="/orders" className={styles.link}>
          My Orders
        </Link>

        {isLoggedIn && (
          <Link to="/cart" className={styles.link}>
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartItemCount > 0 && (
              <span className={styles.cartCount}>{cartItemCount}</span>
            )}
          </Link>
        )}

        <SearchBar />

        {/* If user is logged in, show profile icon and dropdown */}
        {isLoggedIn ? (
          <div className={styles.profileMenu}>
            <button className={styles.iconButton} onClick={toggleDropdown}>
              <FontAwesomeIcon icon={faUserCircle} />
            </button>
            <div
              className={`${styles.dropdown} ${
                dropdownVisible ? styles.dropdownVisible : ""
              }`}
            >
              <Link to="/profile" className={styles.dropdownItem}>
                Profile
              </Link>
              <button
                className={styles.dropdownItem}
                onClick={() => {
                  logout();
                  setDropdownVisible(false); // Close dropdown after logout
                }}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
