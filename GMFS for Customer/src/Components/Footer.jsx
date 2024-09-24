import React from "react";
import styles from "../Styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <hr className={styles.line} />
      <p>&copy; 2024 Garment Management System. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
