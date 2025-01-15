import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../Contexts/StoreContext"; // Import the context
import { useAuth } from "../Contexts/AuthContext"; // Import AuthContext
import styles from "../Styles/ProductPage.module.css"; // Import CSS module

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Access context functions
  const { addToCart, products } = useContext(StoreContext); // Access products from context
  const { isLoggedIn } = useAuth(); // Get login status from AuthContext
  const navigate = useNavigate(); // Initialize navigate for routing

  // Fetch product from the menu based on the ID
  useEffect(() => {
    const fetchedProduct = products.find((item) => item._id === id); // Use products from context

    setProduct(fetchedProduct);
  }, [id, products]); // Dependencies include products to re-run the effect when it changes

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      // Redirect to login page if the user is not logged in
      navigate("/login");
    } else {
      // Add product to cart if logged in
      addToCart(id);
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
          src={product.image}
          alt={product.name}
          className={styles.productImage}
        />
        <p className={styles.productDescription}>{product.description}</p>
        <p>Price: Rs {new Intl.NumberFormat().format(product.price)}</p>{" "}
      </div>

      <button className={styles.btnPrimary} onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductPage;
