import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import styles from "../Styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Social Media Section */}
      <div className={styles.socialMedia}>
        <p>Add Us On:</p>

        <div className={styles.icons}>
          <FaFacebookF className={styles.icon} />
          <FaInstagram className={styles.icon} />
          <FaTwitter className={styles.icon} />
          <FaGithub className={styles.icon} />
        </div>
      </div>

      {/* Copyright Section */}
      <div className={styles.copyright}>
        <hr className={styles.line} />
        <p>© 2024 Garment Management System</p>
      </div>

      {/* Newsletter Signup Section */}
      <div className={styles.newsletter}>
      <div className={styles.par}>
        <p>Sign Up for Newsletter:</p>
        </div>
        <div className={styles.newsletterForm}>
          <input
            type="email"
            placeholder="Email Address"
            className={styles.input}
          />
          <button className={styles.button}>Add</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
