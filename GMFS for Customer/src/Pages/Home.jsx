import React from "react";
import styles from "../Styles/Home.module.css";
import fabricPic from "../assets/image1/homeimage2.jpg";
import fabricPic1 from "../assets/image1/fabric1.jpg";
import About from "./About";
import Gallery from "../Components/TabMenu/Gallery";

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <div>
          <p className={styles.tagline}>
            Discover and <br />
            Find Your Own <br /> Fashion!
          </p>

          <p className={styles.taglines}>
            Explore our curated collection of stylish clothing and <br />{" "}
            accessories tailored to your unique taste.
          </p>
        </div>
        {/* <h1>Welcome to the Garment Management System</h1> */}
        <div className={styles.overlap}>
          <img className={styles.fabric1} src={fabricPic1} alt="fabric" />
          <img className={styles.fabric} src={fabricPic} alt="fabric" />
        </div>
      </div>
    </>
  );
};

export default Home;
