import React from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";
import { useStore } from "../Contexts/StoreContext";
import logo from "../assets/image1/logofirst.png";

const Navbar = () => {
  const { cartItemCount } = useStore(); //Destructuring

  return (
    <nav className={styles.navbar}>
      <div className={styles.para}>
        <img src={logo} alt="Logo" className={styles.logo} />
        {/* <h2>Garment Management System</h2> */}
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

        <Link to="/cart" className={styles.link}>
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartItemCount > 0 && (
            <span className={styles.cartCount}>{cartItemCount}</span>
          )}
        </Link>

        <SearchBar />

        <Link to="/login" className={styles.link}>
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
