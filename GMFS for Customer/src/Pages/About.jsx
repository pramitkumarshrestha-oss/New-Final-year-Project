import React from "react";
import styles from "../Styles/About.module.css";
import fabricPic from "../assets/image1/homeimage.jpg";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imagewrapper}>
        <img className={styles.fabric} src={fabricPic} alt="fabric" />
        <div className={styles.text}>
        <h1 className={styles.heading}>About Us</h1>
        <p className={styles.aboutus_content}>
          We are dedicated to <br />
          revolutionizing the garment industry with cutting-edge <br />
          technology. Our mission is to streamline and automate <br />
          every aspect of garment production, from raw materials <br />
          to finished products, with our powerful Garment Management System
          (GMS)..
        </p>
        <button className={styles.learn}>Learn More</button>
      </div>
      </div>
    </div>
  );
};

export default About;
