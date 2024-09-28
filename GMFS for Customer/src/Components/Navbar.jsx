import React from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";
import { useAuth } from "../Contexts/AuthContext";
import { useStore } from "../Contexts/StoreContext";
import logo from "../assets/image1/logofirst.png";

const Navbar = () => {
  const { cartItemCount } = useStore(); // Destructuring to get cart item count
  const { isLoggedIn, logout } = useAuth(); // Destructure isLoggedIn and logout from AuthContext

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

        {isLoggedIn ? (
          <button
            className={`${styles.link} ${styles.logoutButton}`}
            onClick={logout}
          >
            Logout
          </button>
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
