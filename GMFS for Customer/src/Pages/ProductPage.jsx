import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../Contexts/StoreContext";
import { useAuth } from "../Contexts/AuthContext";
import styles from "../Styles/ProductPage.module.css";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(""); 

  // Access context functions
  const { addToCart, products } = useContext(StoreContext);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const url = "http://localhost:3010";

  // Fetch product from the menu based on the ID
  useEffect(() => {
    const fetchedProduct = products.find((item) => item._id === id); // Use products from context
    setProduct(fetchedProduct);
  }, [id, products]);

  //yaha size ko lagi change gareko
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (!selectedSize) {
      alert("Please select a size before adding to cart.");
    } else {
      addToCart(id, selectedSize); // Pass selected size
    }
  };

  if (!product) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.mainHeading}>{product.name}</h2>
      <div className={styles.productDetails}>
        <img
          src={`${url}/${product.image}`}
          alt={product.name}
          className={styles.productImage}
        />
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>Price: Rs {product.price}</p>{" "}
      </div>

      {/* Size Selector */}
      <div className={styles.sizeSelector}>
        <p>Select Size:</p>
        {["S", "M", "L", "XL"].map((size) => (
          <button
            key={size}
            className={`${styles.sizeButton} ${
              selectedSize === size ? styles.selected : ""
            }`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>

      <button className={styles.btnPrimary} onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductPage;
