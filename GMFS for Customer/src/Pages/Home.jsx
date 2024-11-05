import React, { useEffect, useState } from "react";
import styles from "../Styles/Home.module.css";
import fabricPic from "../assets/image1/homeimage2.jpg";
import fabricPic1 from "../assets/image1/fabric1.jpg";

const images = [fabricPic, fabricPic1]; // Array of images

const Home = () => {
  const [imageIndex1, setImageIndex1] = useState(0); // State for first image
  const [imageIndex2, setImageIndex2] = useState(1); // State for second image

  useEffect(() => {
    const interval = setInterval(() => {
      // Swap the images on each interval
      setImageIndex1((prevIndex) => (prevIndex + 1) % images.length);
      setImageIndex2((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change images every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.tagline}>
          Discover and <br />
          Find Your Own <br /> Fashion!
        </p>

        <p className={styles.taglines}>
          Explore our curated collection of stylish clothing and <br />
          accessories tailored to your unique taste.
        </p>
      </div>

      <div className={styles.overlap}>
        {/* Image 1 */}
        <img
          className={styles.fabric1}
          src={images[imageIndex1]} // Dynamically set the image source
          alt="Fabric 1"
        />

        {/* Image 2 */}
        <img
          className={styles.fabric}
          src={images[imageIndex2]} // Dynamically set the image source
          alt="Fabric 2"
        />
      </div>
    </div>
  );
};

export default Home;
